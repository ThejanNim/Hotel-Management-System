const Customers = require('../models/Customers');

exports.addCustomers = async (req, res) => {
    try {
        const {firstName, lastName, email, mobileNo, address, country, state, city, gender, age} = req.body;

        if (!firstName || !lastName || !email || !mobileNo || !address || !country || !gender ) {
            res.status(400).json({error: "Please provide Customer details"});
        }

        const customers = new Customers({
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobileNo: mobileNo,
            address: address,
            country: country,
            state: state,
            city: city,
            gender: gender,
            age: age
        });
    
        customers.save().then(response => {
            res.status(200).json({
                success: true,
                result: response
            })
        })
        .catch(err => {
            res.status(500).json({
                errors: [{ error: err }]
            });
        });   
    } catch (error) {
        return res.status(400).json({ error: 'Your request could not be processed. Please try again.'});
    }
}