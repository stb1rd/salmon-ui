import { MeasurementForm } from '@/MeasurementForm';
import WaterIcon from '@mui/icons-material/Water';

export default function Home() {
  return (
    <div>
      <header className="flex gap-2 font-serif items-center justify-center p-2 bg-white sticky top-0">
        <h1 className="text-xl">форель для всех</h1>
        <WaterIcon fontSize="large" />
      </header>
      <MeasurementForm />
    </div>
  );
}
