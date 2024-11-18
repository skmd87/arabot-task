import rule from './rule'

export default (value: Parameters<typeof rule>[0]) => {
	return [rule(value)]
}
