const format_prompt=`Please convert the following raw travel itinerary data into a clean, organized, and detailed format suitable for a travel guide. Include day-by-day activities, budget estimates, important considerations, and accommodation suggestions for each location. Also, highlight the most significant attractions and activities in each city, as well as travel tips, such as visa requirements, weather considerations, and cultural sensitivities.

**Raw Itinerary Data:**
<Insert your raw data here>

**Requirements:**
1. **Itinerary Structure:** Break down the itinerary into a day-by-day format, including morning, afternoon, and evening activities for each day.
2. **Budget:** Provide a detailed budget breakdown for accommodation, activities, food, and transportation. Summarize the total estimated budget per person.
3. **Important Considerations:** Include key considerations such as visa requirements, weather, packing tips, currency, language, safety, and cultural sensitivity.
4. **Accommodation:** Suggest accommodation options for each location, categorized by luxury, mid-range, and budget.
5. **Activities:** Highlight key activities and attractions for each location, along with any special experiences (e.g., camel safari in the desert, boat ride on a lake).
6. **Formatting:** Organize the output with clear headings, bullet points, and numbered lists for easy readability.

Please ensure that the final output is well-structured, easy to read, and provides comprehensive information for a traveler planning a trip to Rajasthan, India.

**Example Format:**

**Day 1: Arrival in Jaipur**

* **Morning:** Activity 1
* **Afternoon:** Activity 2
* **Evening:** Activity 3

**Budget:** 
* Accommodation: INR X
* Activities: INR X
* Food: INR X
* Transportation: INR X
* **Total:** INR X

**Important Considerations:**
* **Visa:** Visa requirement details.
* **Weather:** Weather details and packing tips.
* **Currency:** Indian Rupee (INR) and currency exchange tips.
* **Safety:** Safety tips for the location.

**Accommodation:**
* **Luxury:** Hotel Name 1, Hotel Name 2
* **Mid-Range:** Hotel Name 1, Hotel Name 2
* **Budget:** Hotel Name 1, Hotel Name 2

**Activities:**
* Activity 1: Description
* Activity 2: Description

Continue in the same format for each day of the itinerary.
`
module.exports = {format_prompt};