import React from "react"
import { useAppContext } from "../../AppContext"
import '../../pages/topic.css'

function TopicList() {
  const { topics } = useAppContext()

  return (
    <div>
      {topics.length === 0 ? (
        <p>No topics found.</p>
      ) : (
        <React.Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left' }}>Topic</th>
                        <th></th> {/* need this for header line to extend across page */}
                    </tr>
                </thead>
                <tbody>
                    {topics.map((topic) => (
                        <tr key={topic.id}>
                            <td style={{ textAlign: 'left' }}>{topic.topic}</td>
                            <td className="buttons-cell">
                                <button>view flashcards</button>
                                <button>edit topic</button>
                                <button>delete topic</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
      )}
    </div>
  );
}

export default TopicList;