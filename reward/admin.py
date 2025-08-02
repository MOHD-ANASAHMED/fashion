from django.contrib import admin
from .models import Reward, RewardSupport

@admin.register(Reward)
class RewardAdmin(admin.ModelAdmin):
    list_display = ('title', 'amount')
    fields = (
        'title', 'subtitle', 'description', 'amount',
        'image', 'bank_account', 'ifsc', 'upi', 'qr_code'
    )

@admin.register(RewardSupport)
class RewardSupportAdmin(admin.ModelAdmin):
    list_display = ('reward', 'name', 'phone', 'transaction_id', 'submitted_at')
