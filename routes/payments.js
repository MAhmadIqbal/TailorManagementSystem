
// const express = require('express')
// const index=require('../')
// const router = express.Router()
// // const paymentController = require('../controllers')


// router.get("/", (req, res) => {
//     res.render("index");
// });

// router.get("/paypal", (req, res) => {
//     var create_payment_json = {
//         intent: "sale",
//         payer: {
//             payment_method: "paypal"
//         },
//         redirect_urls: {
//             return_url: "https://tailor-management-system.herokuapp.com/success",
//             cancel_url: "https://tailor-management-system.herokuapp.com/cancel"
//         },
//         transactions: [
//             {
//                 item_list: {
//                     items: [
//                         {
//                             name: "item",
//                             sku: "item",
//                             price: "1.00",
//                             currency: "USD",
//                             quantity: 1
//                         }
//                     ]
//                 },
//                 amount: {
//                     currency: "USD",
//                     total: "1.00"
//                 },
//                 description: "This is the payment description."
//             }
//         ]
//     };

//     paypal.payment.create(create_payment_json, function(error, payment) {
//         if (error) {
//             throw error;
//         } else {
//             console.log("Create Payment Response");
//             console.log(payment);
//             res.redirect(payment.links[1].href);
//         }
//     });
// });

// router.get("/success", (req, res) => {
//     // res.send("Success");
//     var PayerID = req.query.PayerID;
//     var paymentId = req.query.paymentId;
//     var execute_payment_json = {
//         payer_id: PayerID,
//         transactions: [
//             {
//                 amount: {
//                     currency: "USD",
//                     total: "1.00"
//                 }
//             }
//         ]
//     };

//     paypal.payment.execute(paymentId, execute_payment_json, function(
//         error,
//         payment
//     ) {
//         if (error) {
//             console.log(error.response);
//             throw error;
//         } else {
//             console.log("Get Payment Response");
//             console.log(JSON.stringify(payment));
//             res.render("success");
//         }
//     });
// });

// router.get('/cancel', (req, res) => {
//     res.render("cancel");
// });

// module.exports = router
const express = require('express')
const router = express.Router()
// const paymentController = require('../controllers')


router.get("/", (req, res) => {
    res.render("index");
});

router.get("/paypal", (req, res) => {
    var create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url: "https://tailor-management-system.herokuapp.com/success",
            cancel_url: "https://tailor-management-system.herokuapp.com/cancel"
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            name: "item",
                            sku: "item",
                            price: "1.00",
                            currency: "USD",
                            quantity: 1
                        }
                    ]
                },
                amount: {
                    currency: "USD",
                    total: "1.00"
                },
                description: "This is the payment description."
            }
        ]
    };

    paypal.payment.create(create_payment_json, function(error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            res.redirect(payment.links[1].href);
        }
    });
});

router.get("/success", (req, res) => {
    // res.send("Success");
    var PayerID = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var execute_payment_json = {
        payer_id: PayerID,
        transactions: [
            {
                amount: {
                    currency: "USD",
                    total: "1.00"
                }
            }
        ]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function(
        error,
        payment
    ) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.render("success");
        }
    });
});

router.get('/cancel', (req, res) => {
    res.render("cancel");
});

module.exports = router
