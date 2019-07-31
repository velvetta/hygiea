import jwt from "jsonwebtoken";
import axios from "axios";

export const API_URL = "http://localhost:5000";
const JWT_SECRET = "e4dd99ae701"; //TODO: STILL REMOVE THIS FOR SECURITY PURPOSES

export function StoreToken(token) {
	localStorage.setItem("token-aui-cms", token);
}

export function TransformData(data) {
	const arr = [];
	data.forEach(complaint => {
		console.log(complaint);
		const field = GetTokenInfo().type === "student" ? "Staff" : "Student";
		const Name = complaint[field].Name;
		delete complaint[field];
		const obj = { ...complaint };
		obj[field] = Name;
		arr.push(obj);
	});

	return arr;
}

export function handleError(error, props) {
	if (!error.response) {
		alert("Failed to reach endpoint!");
		return;
	}
	if (error.response.status === 401) {
		DeleteToken();
		props.history.push("/login"); /** Error here */
	} else alert(error.response.data);
}

export function VerifyLoginStatus() {
	let token = localStorage.getItem("token-aui-cms");
	if (!token) return false;

	let TokenValid = jwt.verify(token,JWT_SECRET);
	return TokenValid ? true : false;
}

export function $axios() {
	const token = localStorage.getItem("token-aui-cms");
	return axios.create({
		baseURL: API_URL,
		headers: { Authorization: `Bearer ${token ? token : ""}` }
	});
}

export function DeleteToken() {
	localStorage.removeItem("token-aui-cms");
}

export function GetTokenInfo() {
	const data = jwt.decode(localStorage.getItem("token-aui-cms"));
	return data;
}
