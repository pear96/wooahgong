from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


# Create your views here.

@api_view(['GET'])
def forme(request):
    return Response({'message': '안녕 여긴 나를 위한 추천이얗ㅎ'})


@api_view(['GET'])
def trend(request):
    return Response({'message': '안녕 여긴 트렌드야!!'})
