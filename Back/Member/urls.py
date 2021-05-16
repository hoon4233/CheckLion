from django.urls import path
from .views import UserList, TeamList,TeamRankingList, ScoreCreate, AddPointCreate
from rest_auth.views import ( LoginView, LogoutView, PasswordChangeView, 
PasswordResetView, PasswordResetConfirmView )
from rest_auth.registration.views import RegisterView

urlpatterns = [
    
    path('login/', LoginView.as_view(), name='Login'),
    path('logout/', LogoutView.as_view(), name='Logout'),
    path('registration/', RegisterView.as_view(), name='Register'),
    path('pwchange/', PasswordChangeView.as_view(), name='PwChange'),
    path('pwreset/', PasswordResetView.as_view(), name='PwReset'),
    path('pwresetconf/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    path('<str:team>/users/', UserList.as_view(), name='Team-User-list'),
    path('teams/', TeamList.as_view(), name='Team-list'),
    path('ranking/', TeamRankingList.as_view(), name='Team-Ranking-list'),
    path('score/<str:team>/', ScoreCreate.as_view(), name='Score-create'),
    path('addpoint/', AddPointCreate.as_view(), name='Add_Point-create')

]