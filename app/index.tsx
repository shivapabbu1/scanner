import Login from './components/Login';
import { SpinnerProvider } from './context/SpinnerContext';

export default function Index() {
  return (
<SpinnerProvider>
    {/* Wrap the Login component with SpinnerProvider to provide spinner context */}
    <Login />   
</SpinnerProvider>
  )
}
