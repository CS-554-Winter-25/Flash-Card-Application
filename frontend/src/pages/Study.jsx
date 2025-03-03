import { useParams } from 'react-router-dom';

function Study() {
  const { topic } = useParams();

  return (
    <div>
			<p>
				Study {topic}
			</p>
    </div>
  );
}

export default Study;