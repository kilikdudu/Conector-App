import MyContext from '../MyContext';
import React, { Component } from 'react';
import UserService from '../../services/user';

export default class CadastroProvider extends Component {

    static contextType = MyContext;

    state = {
        loading: false,
        user: {},
        dadosBasicos: {}
    };

    render() {

        return (
            <MyContext.Provider
                value={{
                    user: this.state.user,
                    loading: this.state.loading,
                    dadosBasicos: this.state.dadosBasicos,
                    showLoading: () => { this.setState( {loading: true} ) },
                    hideLoading: () => { this.setState( {loading: false} ) },
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
                    setDadosBasicos: (params) => {
                        this.setState({ dadosBasicos: params });
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