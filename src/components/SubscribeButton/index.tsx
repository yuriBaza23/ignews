import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const [sessions] = useSession();
    const router = useRouter();

    const handleSubscribe = async () => {
        if(!sessions) {
            signIn('github');
            return;
        }

        if(sessions.activeSubscription) {
            router.push('/posts')
            return;
        }

        try {
            const response = await api.post('subscribe', {})
            const { sessionId } = response.data;

            const stripe = await getStripeJs();
            stripe.redirectToCheckout({ sessionId })
        } catch (err) {
            alert(err.message);
        }
    }

    return(
        <button 
            className={styles.subscribeButton} 
            type='button'
            onClick={handleSubscribe}
        >
            Subscibe now
        </button>
    )
}