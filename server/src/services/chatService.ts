import OpenAI from "openai";
import dotenv from "dotenv";
import { ReservationChat } from "../types/ReservationChat";
import { ChatResponse } from "../types/ChatResponse";
import moment from "moment";
import { getCachedReservationsOnDate } from "../cache/reservationCache";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const villas = [
  { name: "Villa 1", price: 250 },
  { name: "Villa 2", price: 300 },
  { name: "Villa 3", price: 250 },
  { name: "Villa 4", price: 300 },
  { name: "Villa A", price: 250 },
  { name: "Villa B", price: 300 },
  { name: "Villa VIP 1", price: 250 },
  { name: "Villa VIP 2", price: 300 },
];

// export const extractDateVilla = async (
//   userMessage: string,
//   villa?: string,
//   date?: string
// ): Promise<ChatResponse> => {
//   try {
//     const todayDate = new Date();
//     const today = todayDate.toLocaleDateString("en-GB", {
//       month: "2-digit",
//       day: "2-digit",
//       year: "numeric",
//     });
//     const days = [
//       "Sunday",
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//     ];
//     const todayDay = days[todayDate.getDay()];
//     const prompt = `You are an AI assistant for an online villa reservation platform. Your job is to extract dates and the selected villa from the user's message.

//     ### **Understanding Dates**
//     - Today's date is "${today}", a "${todayDay}"
//     - Users may specify a date **explicitly** (e.g., "February 25, 2025") or **implicitly** (e.g., "tonight," "this weekend," "next Monday").
//     - Convert **relative dates** into actual calendar dates based on today's date.
//     - If no date is mentioned, ask the user to specify one.

//     ### **Tracking User Selections**
//     - If the user mentions a villa, store it as their **selected villa**.
//     - If the user asks about availability without specifying a villa, wait for them to choose one.
//     - If the user changes their mind, update their selection.

//     ---

//     ***Villas
//     ${JSON.stringify(villas)}

//     ### Response Format
//     Always return JSON with:
//     - villa: The villa selected by the user.
//     - date: The date given by the user.
//     `;
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         { role: "system", content: [{ text: prompt, type: "text" }] },
//         { role: "user", content: [{ text: userMessage, type: "text" }] },
//       ],
//       response_format: { type: "json_object" },
//       temperature: 0.2,
//       max_completion_tokens: 1024,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//     });
//     const res = JSON.parse(response?.choices[0].message.content || "");
//     return await sendMessageToChatGPT(
//       userMessage,
//       res.villa || villa,
//       res.date || date
//     );
//   } catch (error: any) {
//     console.error(
//       "Error in ChatGPT API:",
//       error.response?.data || error.message
//     );
//     throw new Error("Failed to fetch response from ChatGPT");
//   }
// };

export const sendMessageToChatGPT = async (
  userMessage: string,
  villa?: string,
  date?: string
): Promise<ChatResponse> => {
  try {
    let reservations: ReservationChat[] = [];
    const todayDate = new Date();
    const today = todayDate.toLocaleDateString("en-GB", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const formattedDate = moment(
      date || todayDate,
      moment.ISO_8601,
      true
    ).isValid()
      ? moment(date).format("YYYY-MM-DD")
      : moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
    reservations = await getCachedReservationsOnDate(formattedDate);
    const prompt = `You are an AI assistant for an online villa reservation platform. You have a fixed list of villas and reservations, and you must correctly determine availability based on these records.  Before completing a booking, you must collect the user's full name and phone number. 

    If they have already provided their details or the selected villa and date, automatically **pre-fill them** when they try to book again.  
    If the user wants to update their info, allow them to enter a new name and phone number.  

    ### **Understanding Dates**
    - Today's date is "${todayDate}".
    - Users may specify a date **explicitly** (e.g., "February 25, 2025") or **implicitly** (e.g., "tonight," "this weekend," "next Monday").  
    - Convert **relative dates** into actual calendar dates based on today's date.  
    - If no date is mentioned, ask the user to specify one.  

    ### **Tracking User Selections**
    - If the user mentions a villa, store it as their **selected villa**.  
    - If the user asks about availability without specifying a villa, wait for them to choose one.  
    - If the user changes their mind, update their selection.  

    ### **Example User Flow**
    1. **User:** "I want to book Villa 1 for 02/25/2025."  
      - **Store:** Villa = "Villa 1", Date = "02/25/2025"  
      - **Response:** "Villa 1 costs $250 per night. Do you want to proceed?"  

    2. **User:** "Yes, proceed."  
      - **Use stored villa & date for booking.**  

    ---

    ### **Checking Availability**
    - The date is: ${todayDate}. If it's not given, follow the steps below.
        1. **Extract the user’s intended date** (either explicit or implicit).  
        2. **Compare this date with the fixed reservations data**.  
        3. If a villa appears in reservations for that date, it **is booked**.  
        4. If a villa **is not in the reservation data for that date, it is available**. 

    ---

    ### **Booking Process (User Info & Price Required)**
    1. When a user requests to book a villa, show them the villa’s price and ask if they want to proceed.  
    2. If the user confirms, **request their full name and phone number** before finalizing the booking.  
    3. Once the user provides their details, confirm the booking.  

    ---

    ### Fixed Villa List
    ${JSON.stringify(villas)}

    ---

    ### Fixed Reservation Data
    ${JSON.stringify(reservations)}

    ---

    ### Response Format
    Always return JSON with:
    - message: A short, clear response.
    - replies: Up to 4 short options for the user.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: [{ text: prompt, type: "text" }] },
        { role: "user", content: [{ text: userMessage, type: "text" }] },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
      max_completion_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const res = JSON.parse(response?.choices[0].message.content || "");
    const { message, replies } = res;
    console.log("------------------------------");
    console.log(prompt);
    return { message: message, replies: replies, villa: villa, date: date };
  } catch (error: any) {
    console.error(
      "Error in ChatGPT API:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch response from ChatGPT");
  }
};
