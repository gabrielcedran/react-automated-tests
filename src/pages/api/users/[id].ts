import {NextApiRequest, NextApiResponse} from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
    
    console.log(request.query.id);

    return response.json({id: 3, name: 'Mary'});
}