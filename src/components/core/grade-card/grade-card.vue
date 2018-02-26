<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
	.grade-card-box{
		display: inline-block;
		.grade-card{
			@include flexLayout(inline-flex,normal,center);
			.ask-button.grade{
				font-size: 1.8rem;
				color: map-get($color,A100);
				margin: 0 4px;
				&.check,
				&:hover{
					color: map-get($color,500);
					transition: color .3s ease;
				}
			}
		}
	}
</style>
<template>
	<div class="grade-card-box">
		<div class="grade-card">
			<template v-for="(g,$i) in grade">
				<ask-button class="grade" @ask-click="onChange(g,$i)" :key="$i" :class="{check:g.checked}">
					{{g.name}}
				</ask-button>
			</template>
		</div>
	</div>
</template>
<script>
	export default{
		name:"GradeCard",
		props:['grade'],
		methods:{
			onChange(once,index){
				this.$emit('grade-change',once,index);
			}
		}
	}
</script>