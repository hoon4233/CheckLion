from django.contrib import admin
from .models import User, Team, Score, AdditionalPoint

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'name', 'team_id', 'joined_at', 'last_login_at', 'is_superuser', 'is_active')
    list_display_links = ('id', 'email')
    exclude = ('password',)                           # 사용자 상세 정보에서 비밀번호 필드를 노출하지 않음

    def joined_at(self, obj):
        return obj.date_joined.strftime("%Y-%m-%d")

    def last_login_at(self, obj):
        if not obj.last_login:
            return ''
        return obj.last_login.strftime("%Y-%m-%d %H:%M")

    joined_at.admin_order_field = '-date_joined'      # 가장 최근에 가입한 사람부터 리스팅
    joined_at.short_description = '가입일'
    last_login_at.admin_order_field = 'last_login_at'
    last_login_at.short_description = '최근로그인'


class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'total_point', 'register_date', 'update_date')

class ScoreAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'week', 'assignment', 'attendance', 'lecture')

class AdditionalPointAdmin(admin.ModelAdmin):
    list_display = ('week', 'first_team', 'second_team', 'third_team')



admin.site.register(Team, TeamAdmin)
admin.site.register(Score, ScoreAdmin)
admin.site.register(AdditionalPoint, AdditionalPointAdmin)