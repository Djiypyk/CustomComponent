type DeepLinkerOptions = {
	onIgnored?: () => void
	onFallback?: () => void
	onReturn?: () => void
}

class DeepLinker {
	private hasFocus = true
	private didHide = false

	constructor(private options: DeepLinkerOptions) {
		if (!options) {
			throw new Error('no options')
		}

		// window is blurred when dialogs are shown
		const onBlur = () => {
			this.hasFocus = false
		}

		// document is hidden when native app is shown or browser is backgrounded
		const onVisibilityChange = (e: Event) => {
			if (e.target instanceof Document && e.target.visibilityState === 'hidden') {
				this.didHide = true
			}
		}

		// window is focused when dialogs are hidden, or browser comes into view
		const onFocus = () => {
			if (this.didHide) {
				if (options.onReturn) {
					options.onReturn()
				}

				this.didHide = false // reset
			} else {
				// ignore duplicate focus event when returning from native app on
				// iOS Safari 13.3+
				if (!this.hasFocus && options.onFallback) {
					// wait for app switch transition to fully complete - only then is
					// 'visibilitychange' fired
					setTimeout(() => {
						// if browser was not hidden, the deep link failed
						if (!this.didHide) {
							options.onFallback && options.onFallback()
						}
					}, 1000)
				}
			}

			this.hasFocus = true
		}

		// add/remove event listeners
		// `mode` can be "add" or "remove"
		const bindEvents = (mode: 'add' | 'remove') => {
			;[
				[window, 'blur', onBlur],
				[document, 'visibilitychange', onVisibilityChange],
				[window, 'focus', onFocus],
			].forEach((conf) => {
				if (typeof conf[0] === 'object' && 'addEventListener' in conf[0]) {
					//@ts-ignore
					conf[0][mode + 'EventListener'](conf[1], conf[2])
				}
			})
		}

		// add event listeners
		bindEvents('add')

		// expose public API
		this.destroy = bindEvents.bind(null, 'remove')
		this.openURL = (url: string) => {
			// it can take a while for the dialog to appear
			const dialogTimeout = 500

			setTimeout(() => {
				if (this.hasFocus && options.onIgnored) {
					options.onIgnored()
				}
			}, dialogTimeout)

			window.location.href = url
		}
	}

	public destroy: () => void
	public openURL: (url: string) => void
}

export const getLinker = (fallbackUrl: string) => {
	const linker = new DeepLinker({
		onIgnored: () => {
			window.open(fallbackUrl)
			console.log('browser failed to respond to the deep link')
		},
		onFallback: () => {
			console.log('dialog hidden or user returned to tab')
		},
		onReturn: () => {
			console.log('user returned to the page from the native app')
		},
	})

	return linker
}

export default getLinker
