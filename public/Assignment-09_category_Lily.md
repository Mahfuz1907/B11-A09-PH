## **Subscription Box**

### **Main Requirements**

- ##### **Layout Structure**

1. **Navbar:** The home page will have a navbar, which will contain the Website name, Home, and My Profile (challenge requirements 1). Active routes will be implemented on the navbar.
   1. If a user is logged in, the user's name will appear on the Navigation Bar.
   2. If the user is not logged in, it will show a login button.
   3. So, if a user is logged in, you will show the user's name and a logout button. If you click on the logout button, make sure you have logged out.

2. **Main Section: The** Main Section will show different pages based on routes.

**💡Make sure the Navbar and Footer are showing on all pages without an Error/404 page.**

- ##### **JSON Data Generation**

4.  Create your JSON data and host the image on imgbb/[postimages](https://postimages.org/)

![][image1]

- ##### **Home**

5.  **The home page will have these sections: Slider, Subscription Services, & 2 extra sections**
6.  **Slider:** Add a slider (Daisy UI slider or Swiper slider) with a minimum of 3 slides.
7.  **Subscription Services Section:** In the Subscription Services section, you need to create a JSON minimum of 6 data points. You need to show some data on the card layout on the home page.

    Each service card will contain \- JSON Data
    1.  thumbnail,  
        2. name  
        3. Tech Category  
        4. price  
        5. frequency  
        6. and a “View More” button.

**_( and other info that you want to show on the card is totally up to you)_**

8. **Subscription Service Details Page: (Protected)**  
   When the user clicks the “View More” button, it takes the user to the Subscription Service Details page. This page will be a protected route and ensure that the private route moves to the login page if the user is not logged in. You need to show all the information about the selected service.
   On this page, there will be two input fields named review and rating(between 1-5) and a “Review button”. Users can add any review regarding the service by clicking on the button. Show submitted reviews on this page.  
   You don’t need to save comments using local storage. Don’t worry.

**💡The user shouldn't be redirected to the login page after they reload a page of the private route.**

**⚠️Show all the error and success messages by using toast/sweet alert.**

##### **Other Requirements**

1. **404 page:** Create a 404 page/ not found page.
2. **Extra route:** Add 1 more route to your website. This route should be private and protected, and its contents should be meaningful and relevant.

3. **Dynamic Title:** You need to implement a dynamic title for each page.

4. Once a user is logged in, user information will show on the navbar even if he/she reload the website, this info will not disappear. You can show a loader when the logged-in user's info is in a loading state. You can implement this using Firebase's onAuthStateChange method.

### **Challenges**

1. **My Profile:** Create a protected route where, after logging in, users can see their information like name, email and there will be a form with 1 input for name. Users can edit the name and save the changes.
2. Implement any of the 1 packages from the following list:
   1. [Swiper slider](https://swiperjs.com/)
   2. [Aos animation](https://www.npmjs.com/package/aos)
