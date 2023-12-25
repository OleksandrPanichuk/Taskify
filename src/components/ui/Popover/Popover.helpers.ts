import { TypePopoverAutoPosition, TypePopoverSide, TypePopoverTrigger } from './Popover.types'

type Trigger = NonNullable<TypePopoverTrigger>
type Content = HTMLDivElement

export class PopoverPositioner {
	private trigger: Trigger
	private content: Content
	private triggerPosition: DOMRect
	private readonly scrollTop: number

	private readonly contentHeight: number
	private readonly contentWidth: number

	constructor(trigger: Trigger, content: Content) {
		this.trigger = trigger
		this.content = content

		this.scrollTop = document.documentElement.scrollTop
		this.triggerPosition = trigger.getBoundingClientRect()
		this.contentHeight = content.clientHeight
		this.contentWidth = content.clientWidth

		console.log('content height', content.clientHeight)
	}

	public setPosition(side?: TypePopoverSide, autoPosition?: TypePopoverAutoPosition) {
		switch (side) {
			case 'top':
				if (this.canPositionOnTop() || !autoPosition) {
					this.setTopPosition()
					break
				}

				
					if (this.canPositionOnBottom()) {
						this.setBottomPosition()
						break
					}

					if(autoPosition === 'any-axis') {
						if (this.canPositionOnRight()) {
							this.setRightPosition()
							break
						}
						if (this.canPositionOnLeft()) {
							this.setLeftPosition()
							break
						}
					}
					this.setTopPosition()
					break
				
			case 'left':
				if (this.canPositionOnLeft() || !autoPosition) {
					this.setLeftPosition()
					break
				}

				
				if (this.canPositionOnRight()) {
					this.setRightPosition()
					break
				}

				if(autoPosition === 'any-axis') {
					if (this.canPositionOnBottom()) {
						this.setBottomPosition()
						break
					}
	
					if (this.canPositionOnTop()) {
						this.canPositionOnTop()
						break
					}
				}
				
					this.setLeftPosition()
					break
				
			case 'right':
				if (this.canPositionOnRight() || !autoPosition) {
					this.setRightPosition()
					break
				}
				if (this.canPositionOnLeft()) {
					this.setLeftPosition()
					break
				}
				if(autoPosition === 'any-axis') {
					if (this.canPositionOnBottom()) {
						this.setBottomPosition()
						break
					}
					if (this.canPositionOnTop()) {
						this.setTopPosition()
						break
					}
				}

				this.setRightPosition()
				break
			default:
				if (this.canPositionOnBottom() || !autoPosition) {
					this.setBottomPosition()
					break
				}
				if (this.canPositionOnTop()) {
					this.setTopPosition()
					break
				}
				if(autoPosition === 'any-axis') {
					if (this.canPositionOnRight()) {
						this.setRightPosition()
						break
					}
					if (this.canPositionOnLeft()) {
						this.setLeftPosition()
						break
					}
				}

				this.setBottomPosition()
				break
		}
	}

	public setWidth() {
		const width = this.trigger.clientWidth + 'px'
		this.content.style.maxWidth = width
		this.content.classList.add('w-full')
	}

	private setLeftPosition() {
		this.content.style.left =
			this.triggerPosition.left - this.content.clientWidth + 'px'
		this.content.style.top = this.scrollTop + this.triggerPosition.top + 'px'
	}

	private setTopPosition() {
		const triggerBottom =
			document.body.scrollHeight - (this.triggerPosition.top + this.scrollTop )

		this.content.style.bottom = triggerBottom + 'px'

		const left = this.triggerPosition.left + this.contentWidth > document.documentElement.clientWidth ?  document.documentElement.clientWidth - this.content.clientWidth - 1 : this.triggerPosition.left
		this.content.style.left = left + 'px'
	}

	private setRightPosition() {
		this.content.style.left =
			this.triggerPosition.left + this.trigger.clientWidth + 'px'
		this.content.style.top = this.scrollTop + this.triggerPosition.top + 'px'
	}

	private setBottomPosition() {
		this.content.style.top =
			this.triggerPosition.top +
			this.scrollTop +
			this.triggerPosition.height +
			'px'
		const left = this.triggerPosition.left + this.contentWidth > document.documentElement.clientWidth ?  document.documentElement.clientWidth - this.content.clientWidth - 1 : this.triggerPosition.left
		this.content.style.left = left + 'px'
	}

	private canPositionOnBottom() {
		const clientHeight = document.documentElement.clientHeight
		const skipTop = this.triggerPosition.top + this.trigger.clientHeight

		return clientHeight - skipTop > this.contentHeight
	}

	private canPositionOnTop() {
		return this.triggerPosition.top > this.contentHeight
	}

	private canPositionOnLeft() {
		return this.triggerPosition.left > this.contentWidth
	}

	private canPositionOnRight() {
		const clientWidth = document.documentElement.clientWidth

		const triggerLeft = this.triggerPosition.left + this.trigger.clientWidth

		return clientWidth - triggerLeft > this.contentWidth
	}
}