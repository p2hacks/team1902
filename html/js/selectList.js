// �{�^�����������Ƃ��̓���
window.addEventListener("load", function(event) {
	// �V�K�����������ʂ��o��
	document.getElementById("newList_create").onclick = function() {
		document.getElementById("OverlapWinsow").style.display = "block";
	};
	
	// �L�����Z���������������
	document.getElementById("newList_cancel").onclick = function() {
		document.getElementById("OverlapWinsow").style.display = "none";
	};
	
	// �Â��Ȃ��Ă��镔���������Ă�����
	document.getElementById("OverlapWinsow").onclick = function() {
		document.getElementById("OverlapWinsow").style.display = "none";
	};
	
	// �m������������ʂ������ăT�[�o�[�ɐV�K���X�g�̃��N�G�X�g���s���A���X�g���X�V����
	document.getElementById("newList_decided").onclick = function() {
		document.getElementById("OverlapWinsow").style.display = "none";
		
		// �T�[�o�[�Ƀ��N�G�X�g
		
		// �f�[�^�̍X�V
		
		// �`��̍X�V
		
	};
	
});

