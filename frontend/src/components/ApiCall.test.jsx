import axios from 'axios';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleAddFlashcard } from './ApiCall';
import { handleViewFlashcard } from './ApiCall';
import { handleAddTopic } from './ApiCall';
import { handleDeleteFlashcard } from './ApiCall';
import { handleFetchAllFlashcardsByTopic } from './ApiCall';
import { handleFetchFlashcardsByTopicName } from './ApiCall';
import { handleUpdateFlashcard } from './ApiCall';


vi.mock('axios', () => {
  const axiosMock = {
    create: vi.fn(() => axiosMock),
    post: vi.fn(),
  };
  return { default: axiosMock };
});


// handleAddFlashcard test
describe('handleAddFlashcard', () => {
  let setNewFlashcardMock;

  beforeEach(() => {
    setNewFlashcardMock = vi.fn(); 
    vi.clearAllMocks();
  });

  it('should throw an error if the API call fails', async () => {
    console.log('Axios:', axios); 
    console.log('Axios Post:', axios.post); 

    const newFlashcard = { question: 'What is React?', answer: 'A JavaScript library for UI' };
    const topicIdInput = '123';

    axios.post.mockRejectedValueOnce(new Error('Network Error'));

    await expect(handleAddFlashcard(newFlashcard, topicIdInput, setNewFlashcardMock))
      .rejects.toThrow('Network Error');

    expect(axios.post).toHaveBeenCalledWith('/flashcard/', { ...newFlashcard, topic_id: topicIdInput });
    expect(setNewFlashcardMock).not.toHaveBeenCalled();
  });
});

// handleAddTopic test
describe('handleAddTopic', () => {
  let setNewTopicNameMock;
  let setNewFlashcardMock;

  beforeEach(() => {
    setNewTopicNameMock = vi.fn();
    setNewFlashcardMock = vi.fn();
    vi.clearAllMocks();
  });

  it('should throw an error if the topic name is missing', async () => {
    await expect(handleAddTopic('', setNewTopicNameMock, setNewFlashcardMock))
      .rejects.toThrow('Topic name is required.');

    expect(axios.post).not.toHaveBeenCalled();
    expect(setNewTopicNameMock).not.toHaveBeenCalled();
    expect(setNewFlashcardMock).not.toHaveBeenCalled();
  });

  it('should throw an error if the API call fails', async () => {
    const newTopicName = 'JavaScript';
    axios.post.mockRejectedValueOnce(new Error('Network Error'));

    await expect(handleAddTopic(newTopicName, setNewTopicNameMock, setNewFlashcardMock))
      .rejects.toThrow('Network Error');

    expect(axios.post).toHaveBeenCalledWith(`/topic/?topic=${encodeURIComponent(newTopicName)}`);
    expect(setNewTopicNameMock).not.toHaveBeenCalled();
    expect(setNewFlashcardMock).not.toHaveBeenCalled();
  });

  it('should call setNewTopicName and setNewFlashcard on success', async () => {
    const newTopicName = 'JavaScript';
    const mockResponse = { data: { id: '456' } };
    axios.post.mockResolvedValueOnce(mockResponse);

    const result = await handleAddTopic(newTopicName, setNewTopicNameMock, setNewFlashcardMock);

    expect(axios.post).toHaveBeenCalledWith(`/topic/?topic=${encodeURIComponent(newTopicName)}`);
    expect(setNewTopicNameMock).toHaveBeenCalledWith('');
    expect(setNewFlashcardMock).toHaveBeenCalledWith({ question: '', answer: '', topic_id: '456' });
    expect(result).toEqual(mockResponse.data);
  });
});