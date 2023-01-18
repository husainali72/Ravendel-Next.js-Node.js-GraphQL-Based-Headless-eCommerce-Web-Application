import client from '../apollo-client';
import { isEmpty } from "./service";

export const query2 = async (query, variables, token) => {
    try {
        const response = await client.query({
            query: query,
            variables: variables,
            context: {
                headers: { token: token },
            },
        });
        return Promise.resolve(response);
    } catch (error) {
        const errors = JSON.parse(JSON.stringify(error));
        console.log(error);
        if (
            errors.graphQLErrors && errors.graphQLErrors?.length &&
            !isEmpty(errors.graphQLErrors[0].message)
        ) {
            return Promise.reject(errors.graphQLErrors[0].message);
        }
        if (
            !isEmpty(errors.networkError) &&
            errors.networkError.statusCode === 400
        ) {
            return Promise.reject(errors.message);
        }
        return Promise.reject("Something went wrong");
    }
};