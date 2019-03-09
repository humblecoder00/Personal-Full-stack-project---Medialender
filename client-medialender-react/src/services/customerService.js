import http from "./httpService";
import apiUrl from "../config";
const apiEndpoint = apiUrl + "/users";

export function register(customer) {
  return http.post(apiEndpoint, {
    email: customer.username,
    password: customer.password,
    name: customer.name
  });
}

function customerUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCustomers() {
  return http.get(apiEndpoint);
}

export function getCustomer(customerId) {
  return http.get(customerUrl(customerId));
}

export function saveCustomer(customer) {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return http.put(customerUrl(customer._id), body);
  }

  return http.post(apiEndpoint, customer);
}

export function deleteCustomer(customerId) {
  return http.delete(customerUrl(customerId));
}
