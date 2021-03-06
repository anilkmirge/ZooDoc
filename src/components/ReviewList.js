import React, { useState, useEffect } from 'react';
import { APIURL } from '../config';
import {
	Card,
	ListGroup,
	ListGroupItem,
	Accordion,
	Button,
	CardDeck,
	Row,
	Col,
	Container,
} from 'react-bootstrap';
import { Link, Redirect, } from 'react-router-dom';

function ReviewList(props) {
	console.log(props);
	const [reviews, setReviews] = useState([]);
	const [deleted, setDeleted] = useState(false);
	useEffect(() => {
		const url = `${APIURL}/reviews`;
		fetch(url)
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				setReviews(response);
			})
			.catch(console.error);
	}, []);
	let filteredReview = reviews.filter(
		(review) => review.doctor_id === props.doctorId
	);
	console.log(filteredReview)
const handelEdit = (event) => {
	props.reviewId(event.target.id)
}
	const deleteComment = (event) => {
		// console.log(props.userToken);
		const url = `${APIURL}/reviews/${event.target.id}`;
		props.userToken?
		(fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'Authorization': `Bearer ${props.userToken}`,
			},
		})
			.then((res) => {
				console.log(res);
				setDeleted(true);
				
			})
			.catch(console.error)):(alert('You are not authorized'));
	};
	if (deleted) {
		return <Redirect to='/' />;
		// return <Redirect to={`/doctors/${props.doctorCity}`} />;
		// {`/doctor/${props.doctorId}`}
	}

	
	// if (!reviews) return null;
	console.log(reviews);
	return (
		<div>
			<Container className='container-fluid d-flex justify-content-center'>
				<Row>
					{filteredReview.map((review) => {
						return (
							<Col
								sm={true}
								className='col-lg-4 col-sm-12 col-md-6 mb-3'
								key={review.id}>
								<Card
									style={{ width: '18rem' }}
									className='text-center h-100 review-card '>
									<Card.Body className='single-card'>
										<Card.Title>Review:</Card.Title>
										<Card.Text>Posted by: {review.name}</Card.Text>
										<Card.Text>Description: {review.description}</Card.Text>
										<Card.Text>Overall: {review.overall_rating}</Card.Text>
										<Card.Text>Bedside: {review.bed_side_rating}</Card.Text>
										<Card.Text>Wait Time: {review.wait_time_rating}</Card.Text>
										<Card.Text>
											Created:{' '}
											{new Intl.DateTimeFormat('en-US', {
												year: 'numeric',
												month: 'long',
												day: '2-digit',
											}).format(Date.parse(review.created_at))}
										</Card.Text>
										<Card.Link>
											{props.userToken ? (
												<Link
													to='/edit'
													className='btn btn-primary'
													id={review.id}
													onClick={handelEdit}>
													Edit
												</Link>
											) : (
												<Link
													to='/login'
													className='btn btn-primary'
													id={review.id}
													onClick={handelEdit}>
													Edit
												</Link>
											)}
										</Card.Link>
										<Card.Link
											onClick={deleteComment}
											id={review.id}
											className='btn btn-warning'>
											{' '}
											Delete
										</Card.Link>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Container>
		</div>
		
	);
}
export default ReviewList;
