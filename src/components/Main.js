import React, { useState, useRef } from "react";
import Calendar from "react-calendar";
import { useEffect } from "react";
import axios from "axios";
import MyDocument from "./MyDocument";
import ReactPDF from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import emailjs from "@emailjs/browser";

const Main = () => {
    const [contracts, setContracts] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [guestCount, setGuestCount] = useState(0);
    const [packageType, setPackageType] = useState("King");
    const [tableArrangement, setTableArrangement] = useState("Board Room");
    const [total, setTotal] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [competingEmails, setCompetingEmails] = useState([])

    const form = useRef();

    useEffect(() => {
        async function fetchContracts() {
            const { data } = await axios.get("/api/contracts");
            setContracts(data);
        }
        fetchContracts();
    }, []);

    const paidContractDates = contracts.reduce((acc, { date, status }) => {
        if (status) acc = [...acc, date];
        return acc;
    }, []);

    const [value, onChange] = useState(new Date());
    
    useEffect(() => {
        async function fetchCompetingContracts(value) {
            const { data } = await axios.get("/api/contracts/compContracts", {headers:{ dateInfo: value.toDateString() }} );
            setCompetingEmails(data);
        }
        fetchCompetingContracts(value);
    }, [value]);
    console.log("THIS IS COMPETING EMAILS FROM DATABSE", competingEmails)

    const emails = competingEmails.reduce((acc,{date, user:{email}})=>{
        acc = [...acc, {email, date}]
       return acc
    },[])
    
    console.log("this is just emails from back end", emails)

    const nonCompleteContracts = contracts.reduce(
        (acc, { date, status, user: { email } }) => {
            if (!status && date == value.toDateString()) {
                const obj = { email };
                acc = [...acc, obj];
            }
            return acc;
        },
        []
    );
    
    console.log("This is competingEmails from front end reducer", nonCompleteContracts);

    const handleSumbit = (e) => {
        e.preventDefault();
        console.log("Submitted");
        setSubmitted(!submitted);
        emailjs.sendForm(
            "service_h5duvsb",
            "template_2wvfu4m",
            form.current,
            "xAVyPmuZpVsGtknIu"
        );
    };

    return (
        <>
            <Calendar
                calendarType="Hebrew"
                onChange={onChange}
                value={value}
                tileDisabled={({ date, view }) =>
                    view === "month" &&
                    paidContractDates.some(
                        (disabledDate) =>
                            date.getFullYear() ===
                                new Date(disabledDate).getFullYear() &&
                            date.getMonth() ===
                                new Date(disabledDate).getMonth() &&
                            date.getDate() === new Date(disabledDate).getDate()
                    )
                }
            />
            <form
                ref={form}
                className="form"
                id="userContract"
                onSubmit={handleSumbit}
            >
                <label htmlFor="firstName">First Name:</label>
                <input
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                ></input>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                ></input>
                <label htmlFor="email">Email:</label>
                <input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <label htmlFor="guestCount">Guest Count:</label>
                <input
                    name="guestCount"
                    value={guestCount}
                    onChange={(e) => {
                        setGuestCount(e.target.value);
                    }}
                ></input>
                <label htmlFor="packageType">Package Type:</label>
                <select
                    name="packageType"
                    id="packageSelectList"
                    value={packageType}
                    onChange={(e) => setPackageType(e.currentTarget.value)}
                >
                    <option>King</option> <option>Queen</option>
                    <option>Jack</option>
                </select>
                <label htmlFor="tableArrangement">Table Arrangement:</label>
                <select
                    name="tableArrangement"
                    id="tableSelectList"
                    value={tableArrangement}
                    onChange={(e) => setTableArrangement(e.currentTarget.value)}
                >
                    <option>Board Room</option> <option>Banquet</option>
                    <option>Seperate Tables</option>
                </select>
                <label htmlFor="totalPrice">Total Price:</label>
                <input
                    name="totalPrice"
                    value={total}
                    onChange={(e) => {
                        setTotal(e.currentTarget.value);
                    }}
                ></input>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setTotal(
                            packageType == "King"
                                ? guestCount * 100
                                : packageType == "Queen"
                                ? guestCount * 85
                                : guestCount * 75
                        );
                    }}
                >
                    Update Price
                </button>
                <button type="submit">Submit</button>
            </form>
            {submitted ? (
                <PDFDownloadLink
                    document={<MyDocument email={email} />}
                    fileName="somename.pdf"
                >
                    {({ blob, url, loading, error }) =>
                        loading ? "Loading document..." : "Download now!"
                    }
                </PDFDownloadLink>
            ) : (
                ""
            )}
        </>
    );
};

export default Main;
