import MyContext from '../MyContext';
import React, { Component } from 'react';
import UserService from '../../services/user';

export default class CadastroProvider extends Component {

    static contextType = MyContext;

    state = {
        cars: [
            { name: 'Honda', price: 100, id: "car01" },
            { name: 'BMW', price: 150, id: "car02" },
            { name: 'Mercedes', price: 200, id: "car03" }
        ],
        user: {},
    };

    render() {

        return (
            <MyContext.Provider
                value={{
                    cars: this.state.cars,
                    user: this.state.user,
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
                        let request = await (new UserService(this.context.apiClient)).login(email, password);
                        if(request.sucesso) {
                            let user = this.state.user;
                            user = request.data.login;
                            this.setState({
                                user
                            });
                        }
                        return request;
                    },
                    addUser: async (params) => {
                        let request = await (new UserService(this.context.apiClient)).addUser(params);
                        if(request.sucesso) {
                            let user = this.state.user;
                            user = request.data.addUser;
                            this.setState({
                                user
                            });
                        }
                        return request;
                    }
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}