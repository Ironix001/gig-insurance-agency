exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // In production, connect to your database here
    // For now, return empty array
    // You'll need to implement database connection using Supabase, MongoDB, etc.

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
            success: true,
            message: 'Database connection needed. Connect to Supabase/MongoDB for full functionality.',
            contacts: []
        })
    };
};

