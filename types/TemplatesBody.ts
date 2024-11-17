export interface Template {
	language: 'en_US' | 'ar_SA' // Language for the template.
	name: string // The name identifier for the template.
	category: 'MARKETING' | 'UTILITY' // Category of the template.

	components: Component[] // Array of components that build up the template.
}

  type Component = Body | Header | Footer | Buttons

export type Header = ImageHeader | TextHeader

export interface ImageHeader {
	type: 'HEADER'
	format: 'IMAGE' // Format is IMAGE

	value: {
		url: string // Required if format is "IMAGE".
	}
}

export interface TextHeader {
	type: 'HEADER'
	format: 'TEXT' // Format is TEXT

	value: {
		text: string // Used if format is "TEXT".
	}
}

export interface Body {
	type: 'BODY'
	text: string // Required: Main content of the message.
}

export interface Footer {
	type: 'FOOTER'
	text?: string // Optional: Footer text, such as disclaimers.
}

export interface Buttons {
	type: 'BUTTONS'
	buttons: Button[]
}

export type Button = UrlButton | CallButton

export interface UrlButton {
	type: 'URL' // Type is URL
	text: string // Button display text

	value: {
		url: string // Required if type is "URL".
	}
}

export interface CallButton {
	type: 'CALL' // Type is CALL
	text: string // Button display text

	value: {
		phone_number: string // Used if type is "CALL".
	}
}
