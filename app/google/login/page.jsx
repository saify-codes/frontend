"use client"
import queryString from 'query-string'


const urlParams = queryString.parse(window.location.search);
if (urlParams.error) {
    console.log(`An error occurred: ${urlParams.error}`);
} else {
  console.log(`The code is: ${urlParams.code}`);
}
export default function page() {
  return (
    <div>{urlParams.code}</div>
  )
}
