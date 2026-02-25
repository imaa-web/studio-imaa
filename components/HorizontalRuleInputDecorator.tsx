import {Box, Stack, Text} from '@sanity/ui'
import {StringInputProps} from 'sanity'

export function HorizontalRuleInputDecorator(_props: Readonly<StringInputProps>) {
  return (
    <Box padding={3}>
      <Stack space={2}>
        <Text size={1} muted>
          Este bloco é apenas um marcador visual.
        </Text>
        <Text size={1} muted>
          Ele será convertido em uma tag <strong>&lt;hr /&gt;</strong> no seu site.
        </Text>
      </Stack>
    </Box>
  )
}
