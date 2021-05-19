from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import User, Team, Score, AdditionalPoint
from .serializers import (UserStatusSerializer, TeamInfoSerializer, TeamScoreSerializer,
                            PersonalScoreSerializer, AdditionalPointSerializer
)

# url로 들어온 팀의 팀원들 반환
class UserList(generics.ListAPIView):  
    serializer_class = UserStatusSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        team = self.kwargs['team']
        return User.objects.filter(team_id = team)

# 팀들의 이름 반환
class TeamList(generics.ListAPIView):  
    serializer_class = TeamInfoSerializer
    permission_classes = [IsAuthenticated]
    queryset = Team.objects.all()

# 팀의 스코어 반환
class TeamRankingList(generics.ListAPIView):  
    serializer_class = TeamScoreSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        teams = Team.objects.all()
        score_board = {}
        for team in teams :
            team_name = team.name
            score_board[team_name] = 0
            members = User.objects.filter(team_id = team_name)
            
            for mem in members :
                scores = Score.objects.filter(user_id = mem.id)
                for score in scores :
                    if score.assignment and score.assignment and score.lecture :
                        score_board[team_name] += 1
                    # if score.attendance :
                    #     score_board[team_name] += 1
                    # if score.lecture :
                    #     score_board[team_name] += 1
        
        add_points = AdditionalPoint.objects.values()
        for point in add_points :
            first, second, third = point['first_team_id'],point['second_team_id'],point['third_team_id']
            score_board[first] += 3
            score_board[second] += 2
            score_board[third] += 1

        for (team, score) in score_board.items() :
            teams.filter(name=team).update(total_point=score)
        
        return Team.objects.all().order_by('-total_point')

# 해당 주차 해당 팀의 인원들 점수 정보 반환
class ScoreOfWeekList(generics.ListAPIView):
    serializer_class = PersonalScoreSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        team, week = self.kwargs['team'], self.kwargs['week']
        members = User.objects.filter(team_id=team)
        scores = Score.objects.filter(week=week).filter(user_id__in=members)
        return scores

# 해당 팀의 인원들 점수 생성
class ScoreCreate(generics.CreateAPIView):
    queryset = AdditionalPoint.objects.all()
    serializer_class = PersonalScoreSerializer
    permission_classes = [IsAdminUser]

    def create(self, request, *args, **kwargs):
        print("request.data : ",request.data)
        data = request.data.get("data")
        print("data, before :",data)
        for idx, d in enumerate(data) :
            obj = User.objects.get(email=d['user_id'])
            data[idx]['user_id'] = obj.pk
        print("data, after",data)
        serializer = self.get_serializer(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()
    
    
class AddPointCreate(generics.CreateAPIView):
    serializer_class = AdditionalPointSerializer
    permission_classes = [IsAdminUser]