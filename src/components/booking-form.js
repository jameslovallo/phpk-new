import { html, scss } from 'cuirk'
import rentalAgreement from '../data/rental-agreement.js'
import { accordion, button, grid, icon } from './index.js'

export const bookingForm = () => html`
	<form class="booking-form">
		<label>
			Don’t fill this out if you’re human: <input name="occupation" />
		</label>
		<textarea name="Rentals" hidden></textarea>
		<h2>Contact Information</h2>
		${grid({
			children: [
				html`
					<label>
						<span>Name<sup></sup></span>
						<input type="text" name="Name" required />
					</label>
				`,
				html`
					<label>
						<span>Phone Number<sup></sup></span>
						<input type="tel" name="Phone Number" required />
					</label>
				`,
			],
		})}
		<label>
			<span>Email Address<sup></sup></span>
			<input type="email" name="Email Address" required />
		</label>
		<h2>Booking Information</h2>
		<label>
			<span>Event Date<sup></sup></span>
			<input type="date" name="Date" required />
		</label>
		<label>
			<span>Event Address<sup></sup></span>
			<input name="Address" required />
		</label>
		<label>
			<span>Questions or Special Requests<sup></sup></span>
			<textarea name="Requests" required></textarea>
		</label>
		<h2>Rental Agreement</h2>
		<p>
			By submitting this form, you acknowledge that you have read, understood,
			and agreed to the following rental agreement.
		</p>
		${accordion([
			{ title: 'Safety, Policies, and Conditions', children: rentalAgreement },
		])}
		<br />
		<br />
		${button({
			children: icon({ name: 'Send' }) + 'Submit',
			type: 'submit',
			shape: 'rounded',
		})}
	</form>
`

bookingForm.init = () => {
	const bookingFormElement = document.querySelector('.booking-form')
	if (bookingFormElement) {
		import('/src/api.js').then(({ write }) => {
			bookingFormElement.addEventListener('submit', (e) => {
				e.preventDefault()
				const formData = new FormData(bookingFormElement)
				const fields = Object.fromEntries(formData)
				if (!fields.occupation) {
					delete fields.occupation
					write('Booking', fields)
				}
			})
		})
	}
}

bookingForm.style = scss`
	form {
		label {
			display: grid;
			gap: 0.5rem;
			margin-bottom: 1.5rem;

			&:has([name="occupation"]) {
				display: none;
			}

			&:has([type=checkbox]) {
				align-items: center;
				cursor: pointer;
				justify-content: center;
				grid-template-columns: auto 1fr;
			}

			sup {
				color: red;
				position: relative;
				right: -0.15rem;
				top: -0.15rem;
				vertical-align: baseline;
				&:before {
					content: '*';
				}
			}

			&:has(:valid) sup {
				color: green;
				&:before {
					content: '✓';
				}
			}

			input,
			textarea {
				border: none;
				border-bottom: var(--c-border);
				border-bottom-width: 2px;
				font-size: 1rem;
				padding: 0.5rem;

				&:focus {
					border-bottom-color: var(--c-primary);
					outline: none;
				}

				&[type=checkbox] {
					margin: 0;
				}
			}

			textarea {
				height: 8rem;
				resize: none;
			}
		}
	}
`
