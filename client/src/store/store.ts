import { IUser } from "../models/IUser.ts";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService.ts";
import {AxiosError} from "axios";
import axios from "axios";
import {API_URL} from "../http";
import {AuthResponse} from "../models/response/AuthResponse.ts";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
        const token = localStorage.getItem("token");
        if (token) {
            this.checkAuth();
        }
    }


    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }



    setLoading(bool: boolean) {
         this.isLoading = bool;
    }
    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response);
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            if (e instanceof AxiosError) {  // Проверяем, что ошибка является экземпляром AxiosError
                console.log(e.response?.data?.message);
            } else {
                console.log("An unexpected error occurred:", e);
            }
        }
    }


    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response);
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            if (e instanceof AxiosError) {  // Проверяем, что ошибка является экземпляром AxiosError
                console.log(e.response?.data?.message);
            } else {
                console.log("An unexpected error occurred:", e);
            }
        }

    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem("token");
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
            if (e instanceof AxiosError) {  // Проверяем, что ошибка является экземпляром AxiosError
                console.log(e.response?.data?.message);
            } else {
                console.log("An unexpected error occurred:", e);
            }
        }
    }
    async checkAuth(){
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            console.log(response);
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }catch (e) {
            if (e instanceof AxiosError) {  // Проверяем, что ошибка является экземпляром AxiosError
                console.log(e.response?.data?.message);
            } else {
                console.log("An unexpected error occurred:", e);
            }
        }finally {
            this.setLoading(false);
        }
    }
}