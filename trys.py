import smtplib
import random
import requests
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import time


def run_at_specific_time(hour, minute):
    while True:
        
        
        current_time = time.localtime()
        if current_time.tm_hour == hour and current_time.tm_min == minute:
            print("It's Time! Running your code now.")
            # Call your function or execute your code here
            break
        else:
            print(f"Not yet {hour}:{minute} Waiting...")
            # Adjust the sleep time based on how often you want to check the time
            time.sleep(60)  # Sleep for 60 seconds (1 minute) before checking again

# Specify the desired time (11:30)
desired_hour = 12
desired_minute = 27

# Run the function
run_at_specific_time(desired_hour, desired_minute)

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
    {"quote": "Believe you can and you're halfway there.", "author": "Theodore Roosevelt"},
    {"quote": "In the middle of difficulty lies opportunity.", "author": "Albert Einstein"},
    {"quote": "Success is not final, failure is not fatal: It is the courage to continue that counts.", "author": "Winston Churchill"},
    {"quote": "Your time is limited, don't waste it living someone else's life.", "author": "Steve Jobs"},
    {"quote": "The only way to do great work is to love what you do.", "author": "Steve Jobs"},
    {"quote": "Stay hungry, stay foolish.", "author": "Steve Jobs"},
    {"quote": "Life is what happens when you're busy making other plans.", "author": "John Lennon"},
    {"quote": "The journey of a thousand miles begins with one step.", "author": "Lao Tzu"},
    {"quote": "I am the master of my fate, I am the captain of my soul.", "author": "William Ernest Henley"},
    {"quote": "Dream big and dare to fail.", "author": "Norman Vaughan"},
    {"quote": "What we think, we become.", "author": "Buddha"},
    {"quote": "Life is either a daring adventure or nothing at all.", "author": "Helen Keller"},
    {"quote": "Be yourself; everyone else is already taken.", "author": "Oscar Wilde"},
    {"quote": "The only limit to our realization of tomorrow will be our doubts of today.", "author": "Franklin D. Roosevelt"},
    {"quote": "You miss 100% of the shots you don't take.", "author": "Wayne Gretzky"},
    {"quote": "The future depends on what you do today.", "author": "Mahatma Gandhi"},
    {"quote": "If you want to lift yourself up, lift up someone else.", "author": "Booker T. Washington"},
    {"quote": "Do what you can, with what you have, where you are.", "author": "Theodore Roosevelt"},
    {"quote": "Be the change that you wish to see in the world.", "author": "Mahatma Gandhi"},
    {"quote": "Strive not to be a success, but rather to be of value.", "author": "Albert Einstein"},
    {"quote": "The only way to discover the limits of the possible is to go beyond them into the impossible.", "author": "Arthur C. Clarke"},
    {"quote": "The best revenge is massive success.", "author": "Frank Sinatra"},
    {"quote": "You must be the change you wish to see in the world.", "author": "Mahatma Gandhi"},
    {"quote": "It does not matter how slowly you go as long as you do not stop.", "author": "Confucius"},
    {"quote": "Keep your face always toward the sunshine - and shadows will fall behind you.", "author": "Walt Whitman"},
    {"quote": "Don't cry because it's over, smile because it happened.", "author": "Dr. Seuss"},
    {"quote": "You become what you believe.", "author": "Oprah Winfrey"},
    {"quote": "The way to get started is to quit talking and begin doing.", "author": "Walt Disney"},
    {"quote": "It's not whether you get knocked down, it's whether you get up.", "author": "Vince Lombardi"},
    {"quote": "Life is a journey, not a destination.", "author": "Ralph Waldo Emerson"},
    {"quote": "The only person you are destined to become is the person you decide to be.", "author": "Ralph Waldo Emerson"},
    {"quote": "Don't let yesterday take up too much of today.", "author": "Will Rogers"},
    {"quote": "What lies behind us and what lies before us are tiny matters compared to what lies within us.", "author": "Ralph Waldo Emerson"},
    {"quote": "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.", "author": "Helen Keller"},
    {"quote": "Everything you can imagine is real.", "author": "Pablo Picasso"},
    {"quote": "Life is not about finding yourself. Life is about creating yourself.", "author": "George Bernard Shaw"},
    {"quote": "In three wordto do great work is to love what you do.", "author": "Steve Jobs"},
    {"quote": "The only limit to our realization of tomorrow will be our doubts of today.", "author": "Franklin D. Roosevelt"},
    {"quote": "Nothing is impossible, the word itself says 'I'm possible'!", "author": "Audrey Hepburn"},
    {"quote": "In the end, it's not the years in your life that count. It's the life in your years.", "author": "Abraham Lincoln"},
    {"quote": "Life is 10% what happens to us and 90% how we react to it.", "author": "Charles R. Swindoll"},
    {"quote": "What you get by achieving your goals is not as important as what you become by achieving your goals.", "author": "Zig Ziglar"},
    {"quote": "The only way to do great work is to love what you do.", "author": "Steve Jobs"},
    {"quote": "The most powerful weapon is kindness.", "author": "Unknown"}
]

# Get a random quote from the list
quotes = list({quote['quote']: quote for quote in quotes}.values())
quotes_data = random.choice(quotes)
quote = quotes_data["quote"]
author = quotes_data["author"]

# Get the user's email address
emails = [
    {"email": "embroconnect3@gmail.com", "name": "chijioke"},
    {"email": "embroconnect2@gmail.com", "name": "Chijioke"},
    {"email": "embroconnect9@gmail.com", "name": "Chijioke"},
    {"email": "joshuaedozie785@gmail.com", "name": "Joshua"},
    {"email": "asogwachisom181@gmail.com", "name": "Daniel"}
]

# Use an App Password for Gmail authentication
gmail_user = "embroconnect3@gmail.com"  # Your Gmail email address
gmail_app_password = "iuxbltuonrtpocwn"  # Replace with your App Password

for recipient in emails:
    try:
        email = recipient["email"]
        name = recipient["name"]

        # Create a new message for each email address
        message = MIMEMultipart()
        message['From'] = gmail_user
        message['To'] = email
        message['Subject'] = "DAILY MOTIVATIONAL QUOTE"
        
        # Get a random quote for this message
        quote_data = random.choice(quotes)
        quote = quote_data["quote"]
        author = quote_data["author"]
        
        # Get a random image URL from Unsplash
        image_url = get_random_image_url()
        
        # Prepare the email content
        html_content = f"""
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #F5F5F5; color: #333; text-align: center; padding: 20px;">
            <h2> Hello {name} </h2>
            <img src="{image_url}" alt="Motivational Image" style="max-width: 100%; height: auto; border-radius: 5px;">
            <div style="background-color: #FFF; border-radius: 5px; padding: 20px; margin: 20px 0;">
              <h1 style="color: #007BFF;">Today's Motivational Quote</h1>
              <div style="background-color: #000; padding: 20px; border-radius: 5px;">
                <blockquote style="font-size: 1.5em; font-weight: bold; color: #FFF;">{quote}</blockquote>
              </div>
              <p style="font-size: 1.2em; color: #000;">- {author}</p>
            </div>
            <p style="font-size: 1.2em;">This email will be sent to you every day at {desired_hour}:{desired_minute} AM. To unsubscribe, simply reply to this email with the word 'stop'.</p>
          </body>
        </html>
        """
        
        # Attach the HTML content to the message
        message.attach(MIMEText(html_content, 'html'))
        
        # Send the email
        server = smtplib.SMTP("smtp.gmail.com", 465)
        server.starttls()
        server.login(gmail_user, gmail_app_password)
        server.sendmail(gmail_user, email, message.as_string())
        server.quit()
        print(f"Email sent to {name} at {email}!")
    
    except Exception as e:
        print(f"An error occurred while sending email to {email}: {e}")
