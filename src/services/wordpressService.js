const axios = require("axios");

exports.publishPost = async (server, post) => {

    return await axios.post(

        `${server.apiUrl}/wp-json/wp/v2/posts`,

        post,

        {
            auth: {
                username: server.username,
                password: server.password
            }
        }

    );

};


exports.uploadMedia = async (server, formData, headers) => {

    return await axios.post(

        `${server.apiUrl}/wp-json/wp/v2/media`,

        formData,

        {
            headers,
            auth: {
                username: server.username,
                password: server.password
            }
        }

    );

};


exports.createCategory = async (server, category) => {

    return await axios.post(

        `${server.apiUrl}/wp-json/wp/v2/categories`,

        category,

        {
            auth: {
                username: server.username,
                password: server.password
            }
        }

    );

};