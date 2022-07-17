import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {

    console.log(request.query.params)

    return response.json({id: 3, name: 'mary'})
}