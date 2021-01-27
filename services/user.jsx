import { gql } from '@apollo/client';
import StatusRequest from '../models/statusRequest';
import Util from './util';

export default class UserService {

    constructor(client) {
        this.client = client;
    }

    async login(email, password) {
        try {
            var resultQuery = await this.client
            .query({ 
                query: gql`
                    query Login($email: String!, $password: String!){
                        login(email: $email, password: $password){
                            firstName
                            mobile
                            id
                        }
                    }
                `,
                variables: {
                    "email": email,
                    "password": password
                }
            });
           
            return new StatusRequest(true, null, resultQuery.data);
        } catch (error) {
            var ret = new StatusRequest(false);
            ret.mensagem = Util.getServiceErrorReturn(error);
            return ret;
        }
    }

    async addUser(params) {
        try {
            var resultQuery = await this.client
            .query({ 
                query: gql`
                    mutation AddUser($firstName: String!, $lastName: String!, $birthday: DateTime!, 
                        $email: String!, $mobile: String!, $password:String!, $linkedinToken: String) {
                            addUser(firstName: $firstName, lastName: $lastName, birthday: $birthday, 
                                email: $email, mobile: $mobile, password: $password, linkedinToken: $linkedinToken) {
                                    firstName
                                    lastName
                                    id
                            }   
                        }
                `,
                variables: {
                    firstName: params.firstName,
                    lastName: params.lastName,
                    birthday: params.birthday,
                    email: params.email,
                    mobile: params.mobile,
                    password: params.password
                  }
            });
           
            return new StatusRequest(true, null, resultQuery.data);
        } catch (error) {
            var ret = new StatusRequest(false);
            ret.mensagem = Util.getServiceErrorReturn(error);
            return ret;
        }
    }
}