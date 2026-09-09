const wordpress = require("../services/wordpressService");

exports.publish = async (req, res) => {

    try {

        const response =
            await wordpress.publishPost(
                req.activeServer,
                req.body
            );

        res.json(response.data);

    } catch (err) {

        console.log(err.response?.data);

        res.status(500).json({
            message: "Unable to publish"
        });

    }

};