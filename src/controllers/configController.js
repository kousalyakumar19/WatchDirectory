const Configuration = require('../models/Configuration');

exports.updateConfiguration = async (req, res) => {
    try {
        const { directoryPath, interval, magicString } = req.body;   // Fetch configuration details from request body
        const configurationDetails = await Configuration.findByPk(req.query.id);    // passing 'id' value from query

        if (configurationDetails) {    // If configuration entry already exists, update its values
            configurationDetails.directoryPath = directoryPath;
            configurationDetails.interval = interval;
            configurationDetails.magicString = magicString;
            await configurationDetails.save();
        } else if (!configurationDetails) {
            return res.status(404).json({ error: 'Configuration not found' });
        }

        return res.status(200).json({ message: 'Configuration updated successfully', configuration });
    } catch (error) {
        console.error('Error updating configuration:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getConfiguration = async (req, res) => {
    try {
        // Fetch configuration from the database
        const configuration = await Configuration.findOne({ where: { id: req.params.id } }); // Passing id 
        return res.status(200).json({ configuration: configuration });
    } catch (error) {
        console.error('Error fetching configuration:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};