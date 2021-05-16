from rest_framework import serializers
from .models import Team, User, Score, AdditionalPoint


class UserStatusSerializer(serializers.ModelSerializer):
    user_profile = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = User
        fields = "__all__"

class TeamInfoSerializer(serializers.ModelSerializer):
    class Meta :
        model = Team
        fields = ['name']

class TeamScoreSerializer(serializers.ModelSerializer):
    class Meta :
        model = Team
        fields = ['name','total_point']

class PersonalScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = "__all__"

class AdditionalPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdditionalPoint
        fields = ['week','first_team','second_team','third_team']