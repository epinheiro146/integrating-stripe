import * as React from 'react';
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { fetcher } from '../services/fetch-helper';
import swal from 'sweetalert';

const Donate = () => {

    const stripe = useStripe();

    const elements = useElements();

    const [amount, setAmount] = useState("");

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!CardElement || !elements || !stripe) {
            return;
        };

        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        };

        const paymentMethod = await stripe.createPaymentMethod({
            card: card,
            type: "card"
        });

        fetcher("/api/payments", "POST", { paymentMethod, amount })
            .then((data: any) => {
                swal("Thank you!", `${data.message}`, "success");
            })
            .catch(error => swal("Oops!", `${error.message}`, "error"));



    };

    return (
        <div className="mt-5 row justify-content-center">
            <div className="col-12 col-md-8">
                <div className="card text-bg-dark shadow-lg">
                    <div className="card-title text-center mt-4">
                        <h4>Help keep us going!</h4>
                    </div>
                    <div className="card-body">
                        <div>
                            <p>Amount:</p>
                            <textarea className="form-control mb-2" rows={1} value={amount} onChange={e => setAmount(e.target.value)} />
                            <CardElement className="form-control mb-2" />
                            <button onClick={handleSubmit} className="btn btn-outline-success">
                                Donate!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donate;