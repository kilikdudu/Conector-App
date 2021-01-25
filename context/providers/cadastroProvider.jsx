import MyContext from '../MyContext';
import React, { Component } from 'react';
import { gql } from '@apollo/client'

export default class CadastroProvider extends Component {

    static contextType = MyContext;

    state = {
        cars: [
            { name: 'Honda', price: 100, id: "car01" },
            { name: 'BMW', price: 150, id: "car02" },
            { name: 'Mercedes', price: 200, id: "car03" }
        ]
    };

    render() {

        return (
            <MyContext.Provider
                value={{
                    cars: this.state.cars,
                    incrementPrice: selectedID => {
                        const cars = [...this.state.cars];
                        let car = cars.find(e => e.id == selectedID);
                        car.price = car.price + 1;
                        this.setState({
                            cars
                        });
                    },
                    decrementPrice: selectedID => {
                        const cars = [...this.state.cars];
                        let car = cars.find(e => e.id == selectedID);
                        car.price = car.price - 1;
                        this.setState({
                            cars
                        });
                    },
                    login: async (email, password) => {
                        var resultQuery = await this.context.apiClient
                        .query({ 
                            query: gql`
                                {
                                    login(email: $email, password: $password){
                                        firstName
                                        mobile
                                        id
                                    }
                                }
                            `,
                            variables: {
                                email: email,
                                password: password
                            }
                        });
                        console.log("Resultado graph", resultQuery.data);
                    }
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}