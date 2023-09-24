import smtplib
import random
import requests
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Function to get a random image URL from Unsplash
def get_random_image_url():
    response = requests.get("https://source.unsplash.com/random/794x1123")
    return response.url

# Create a list of quotes
quotes = [
    {"quote": "The greatest glory in living lies not in never falling, but in rising every time we fall.", "author": "Nelson Mandela"},
    {"quote": "The future belongs to those who believe in the beauty of their dreams.", "author": "Eleanor Roosevelt"},
    {"quote": "It's not about waiting for the storm to pass, it's about learning to dance in the rain.", "author": "Vivian Greene"},
    {"quote": "Don't be afraid to fail. Be afraid not to try.", "author": "Michael Jordan"},
    {"quote": "The only thing that is constant is change.", "author": "Heraclitus"},
    {"quote": "The best way to predict the future is to create it.", "author": "Peter Drucker"},
    {"quote": "It's not about how much you have, it's about how much you enjoy.", "author": "Unknown"},
    {"quote": "Happiness is not something ready made. It comes from your own actions.", "author": "Dalai Lama"},
    {"quote": "The greatest wealth is to live content with little.", "author": "Plato"},
    {"quote": "The most powerful weapon is kindness.", "author": "Unknown"}
]

# Get a random quote from the list
quote_data = random.choice(quotes)
quote = quote_data["quote"]
author = quote_data["author"]

# Get the user's email address
email = input("Enter your email address: ")

# Use an App Password for Gmail authentication
# (Your Gmail credentials remain unchanged)

message = MIMEMultipart()
message['From'] = gmail_user
message['To'] = email
message['Subject'] = "DAILY MOTIVATIONAL QUOTE"

# Get a random image URL from Unsplash
image_url = get_random_image_url()

# Prepare the email content
html_content = f"""
<html>
  <body style="font-family: Arial, sans-serif; background-color: #F5F5F5; color: #333; text-align: center; padding: 20px;">
    <img src="{image_url}" alt="Motivational Image" style="max-width: 100%; height: auto; border-radius: 5px;">
    <div style="background-color: #FFF; border-radius: 5px; padding: 20px; margin: 20px 0;">
      <h1 style="color: #007BFF;">Today's Motivational Quote</h1>
      <div style="background-color: #000; padding: 20px; border-radius: 5px;">
        <blockquote style="font-size: 1.5em; font-weight: bold; color: #FFF;">{quote}</blockquote>
      </div>
      <p style="font-size: 1.2em; color: #000;">- {author}</p>
    </div>
    <p style="font-size: 1.2em;">This email will be sent to you every day at 8:00 AM. To unsubscribe, simply reply to this email with the word 'stop'.</p>
  </body>
</html>

"""

message.attach(MIMEText(html_content, 'html'))

# Send the email
try:
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(gmail_user, gmail_app_password)

    # Create the email message
    
    server.sendmail(gmail_user, email, message.as_string())
    server.quit()
    print("Email sent!")
except Exception as e:
    print(f"An error occurred: {str(e)}")

