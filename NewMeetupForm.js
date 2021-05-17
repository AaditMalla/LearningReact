import { useRef } from "react";
import Card from "../ui/Card";
import { useHistory } from "react-router-dom";
import css from "./NewMeetupForm.module.css";

function NewMeetupForm(props) {
	const titleInputRef = useRef();
	const imageInputRef = useRef();
	const addressInputRef = useRef();
	const descriptionInputRef = useRef();
	const history = useHistory();

	async function submitHandler(event) {
		event.preventDefault();

		const enteredTitle = titleInputRef.current.value;
		const enteredAddress = addressInputRef.current.value;
		const enteredImage = imageInputRef.current.value;
		const enteredDescription = descriptionInputRef.current.value;

		const meetupData = {
			title: enteredTitle,
			address: enteredAddress,
			image: enteredImage,
			description: enteredDescription,
		};

		await fetch(
			"https://react-getting-started-5ae9d-default-rtdb.firebaseio.com/meetups.json",
			{
				method: "POST",
				body: JSON.stringify(meetupData),
				header: {
					"Content-type": "application/json",
				},
			}
		);
		history.replace("/");
	}

	return (
		<Card>
			<form className={css.form} onSubmit={submitHandler}>
				<div className={css.control}>
					<lable htmlFor="title">Meetup Title</lable>
					<input type="text" required id="title" ref={titleInputRef}></input>
				</div>
				<div className={css.control}>
					<lable htmlFor="image">Meetup Image</lable>
					<input type="url" required id="image" ref={imageInputRef}></input>
				</div>
				<div className={css.control}>
					<lable htmlFor="address">Meetup Address</lable>
					<input
						type="text"
						required
						id="address"
						ref={addressInputRef}
					></input>
				</div>
				<div className={css.control}>
					<lable htmlFor="description">Meetup Description</lable>
					<textarea
						required
						id="title"
						rows="5"
						ref={descriptionInputRef}
					></textarea>
				</div>
				<div className={css.actions}>
					<button>Add Meetup</button>
				</div>
			</form>
		</Card>
	);
}

export default NewMeetupForm;
