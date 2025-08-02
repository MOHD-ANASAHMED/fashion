'''# Add get_object_or_404 for the rewards urls
from django.shortcuts import render, get_object_or_404
from .models import Reward

def home(request):
   rewards = Reward.objects.all()
   return render(request, 'website/home.html', {'rewards': rewards})

#added for the reward urls
def reward_detail(request, reward_id):
   reward = get_object_or_404(Reward, pk=reward_id)
   return render(request, 'reward_detail.html', {'reward': reward})
   '''

from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from .models import Reward, RewardSupport

def home(request):
    rewards = Reward.objects.all()
    return render(request, 'website/home.html', {'rewards': rewards})


def reward_detail(request, pk):
    reward = get_object_or_404(Reward, pk=pk)

    if request.method == 'POST':
        name = request.POST.get('name')
        phone = request.POST.get('phone')
        transaction_id = request.POST.get('transaction_id')

        if name and phone and transaction_id:
            RewardSupport.objects.create(
                reward=reward,
                name=name,
                phone=phone,
                transaction_id=transaction_id
            )
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Missing data'}, status=400)

    return render(request, 'reward/reward_detail.html', {'reward': reward})