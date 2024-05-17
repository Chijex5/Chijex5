from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.settings import api_settings
from .models import UserProfile, User, Item
import json


def home(request):
    return render(request, 'home.html')

@api_view(['POST'])
@csrf_exempt
def add_user(request):
    if request.method == 'POST':
        try:
            regno = request.POST.get('regno')
            name = request.POST.get('name')
            email = request.POST.get('email')
            # Check if username or email already exist
            if UserProfile.objects.filter(regno=regno).exists() or UserProfile.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Username or email already exists'}, status=400)
            phone = request.POST.get('phone')
            address = request.POST.get('address')
            department = request.POST.get('department')
            level = request.POST.get('level')
            password = request.POST.get('password')
            # Create a new UserProfile object and add it to the database
            new_user = UserProfile(regno=regno, name=name, email=email, phone=phone, department=department, address=address, level=level, password=password)
            new_user.save()
            return JsonResponse({'message': 'User profile added successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return render(request, 'signup.html')

    
@api_view(['POST'])
@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            username = request.POST.get('username')
            password = request.POST.get('password')
            # Authenticate user
            user = authenticate(username=username, password=password)
            if user is not None:
                # Authentication successful, generate and return access token
                return JsonResponse({'access_token': 'YOUR_ACCESS_TOKEN'}, status=200)
            else:
                # Authentication failed
                return JsonResponse({'error': 'Invalid username or password'}, status=401)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return render(request, 'login.html')
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
@login_required
def get_items(request):
    if request.method == 'GET':
        try:
            # Get the user's identity from the request (authenticated user)
            user = request.user
            # Query the database to retrieve items associated with the current user's username
            items = Item.objects.filter(regno=user.regno).all()
            # Serialize the items data into JSON format
            items_data = []
            for item in items:
                item_data = {
                    'id': item.id,
                    'user_id': item.regno,
                    'name': item.name,
                    'email': item.email,
                    'phone': item.phone,
                    'department': item.department,
                    'address': item.address,
                    'level': item.level
                }
                items_data.append(item_data)
            # Return the serialized items data as JSON response
            return JsonResponse({'items': items_data}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)
    return render(request, 'dashboard.html')

@api_view(['POST'])
@csrf_exempt
@login_required
def update_item(request):
    if request.method == 'POST':
        try:
            # Get the user's identity from the request (authenticated user)
            user = request.user
            # Load JSON data from the request body
            data = json.loads(request.body)
            # Extract item ID from JSON data
            item_id = data.get('id')
            # Query the database to get the item
            item = Item.objects.filter(id=item_id, regno=user.regno).first()
            if item:
                # Update item fields
                item.name = data.get('name', item.name)
                item.email = data.get('email', item.email)
                item.phone = data.get('phone', item.phone)
                item.department = data.get('department', item.department)
                item.address = data.get('address', item.address)
                item.level = data.get('level', item.level)
                # Save the updated item
                item.save()
                return JsonResponse({'message': 'Item updated successfully'}, status=200)
            else:
                return JsonResponse({'error': 'Item not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    return render(request, 'dashboard.html')