import { NextApiRequest, NextApiResponse } from 'next';

// it could also be a traditional function `export default myBeautifulFundction(req, res) {...}
export default (request: NextApiRequest, response: NextApiResponse) => {
    // here we can do whatever we wanted (fetch data from api or db) - it is a regular node application
    const users = [
        {id: 1, name: 'Don'},
        {id: 2, name: 'Bob'},
        {id: 3, name: 'Mary'},
    ]
    return response.json(users);
}
