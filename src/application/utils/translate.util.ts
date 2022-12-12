// @ts-expect-error
import translate from 'translate'

translate.engine = 'google'

export async function translateText (text: string): Promise<string> {
  return await translate(text, 'es') as string
}
