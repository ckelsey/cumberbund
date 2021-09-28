import SetValid from './set-valid'

export default function FromEntities(value: any) {
    if (typeof value == 'string') {
        return SetValid(
            value
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;|&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
                .replace(/&apos;|&lsquo;|&rsquo;|&#8216;/g, '\''),
            true
        )
    }

    return SetValid(value, false)
}