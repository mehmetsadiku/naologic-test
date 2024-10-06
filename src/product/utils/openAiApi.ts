import { BaseMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';

export const promptResponse = async (product: any): Promise<BaseMessage> => {
  const prompt = `
    You are an expert in medical sales. Your specialty is medical consumables used
    by hospitals on a daily basis. Your task is to enhance the description of a
    product based on the information provided.
    Product name: ${product.name}
    Product description: ${product.description || 'N/A'}
    Category: ${product.category || 'N/A'}
    New Description:
  `;
  const model = new ChatOpenAI({
    apiKey: 'process.env.OPENAI_API_KEY',
    modelName: 'gpt-4-1106-preview',
  });
  const messages = model.invoke(new HumanMessage(prompt));
  const response = await model.call(messages);
  return response;
};
