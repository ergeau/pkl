var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };
  
  var game = new Phaser.Game(config);
  var X_POSITION;
  var Y_POSITION;
  var daun;
  var spawningAllowed;
  var wormsGroup;
  var btnClicked;
  var line;
  var cacing;
  var isSwingingLeft;
  var cacingOffsetX;
  var gameStarted;
  var checkpointTriggered;
  var windR;
  var windL;
  var swingTweenRight;
  var swingTweenLeft;
  
  
  function preload() {
    this.load.image("worm_chara", "assets/worm_chara.png");
    this.load.image("bg", "assets/bg1.png");
    this.load.image("daun1", "assets/daun1.png");
    this.load.image("daun2", "assets/daun2.png");
    this.load.image("daun3", "assets/daun3.png");
    this.load.image("daun4", "assets/daun4.png");
    this.load.image("daun5", "assets/daun5.png");
    this.load.image("daun6", "assets/daun6.png");
    this.load.image("btn_0", "assets/btn_0.png");
    this.load.image("btn_1", "assets/btn_1.png");
    this.load.image("btn_2", "assets/btn_2.png");
    this.load.image("btn_3", "assets/btn_3.png");
    this.load.image("btn_4", "assets/btn_4.png");
    this.load.image("btn_5", "assets/btn_5.png");
    this.load.image("cloud_charaR", "assets/cloud_charaR.png");
    this.load.image("cloud_charaL", "assets/cloud_charaL.png");
    this.load.image("panel_ktg", "assets/panel_ktg.png");
    this.load.image("panel_daun", "assets/panel_daun1.png");
    this.load.image("panel_start", "assets/panel_start.png");
    this.load.image("panel_num", "assets/panel_num.png");
  
    this.load.image("tali", "assets/tali.png");
  
    // sound here
    this.load.audio("benar", "assets/sfx/benar.mp3");
    this.load.audio("salah", "assets/sfx/salah.mp3");
    this.load.audio("get", "assets/sfx/get.mp3");
    this.load.audio("start", "assets/sfx/start.mp3");
    this.load.audio("wind", "assets/sfx/wind.mp3");
  }
  
  function create() {
    // Inisialisasi properti game
    this.totalScore = 0;
    this.daun = null;
    this.points = 0;
    this.textScore = null;
    this.textLeaves = null;
    this.leavesSpawned = 0;
    this.maxLeaves = 5;
    this.currentLevel = 1;
    this.totalCollectedLeaves = 0;
    this.lastLeaf = null;
    var myScene = this;
    var btnClicked = false;
    var gameStarted = false;
    var snd_cloudClick = this.sound.add('wind');
    var snd_start = this.sound.add('start');
    var snd_benar = this.sound.add('benar');
    var snd_salah = this.sound.add('salah');
    var snd_get = this.sound.add('get');
    this.collectedLeavesCount = 0;
    const canvasHeight = game.canvas.height;
    isSwingingLeft = true;
    this.leafContainers = [];
    this.fallenLeaves = [];
  
    // Konstanta untuk penataan tombol
    const numLeafContainers = 5;
    const boxWidth = 100;
    const boxHeight = 100;
    const spacing = 0;
    const buttonSpacing = 100;

    X_POSITION = { LEFT: 0, CENTER: game.canvas.width / 2, RIGHT: game.canvas.width };
    Y_POSITION = { TOP: 0, CENTER: game.canvas.height / 2, BOTTOM: game.canvas.height };
  
    // Penataan latar belakang dan karakter
    this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, 'bg').setOrigin(0.5);
  
    // Pembuatan tombol awan
    windR = this.add.image(X_POSITION.CENTER + 350, Y_POSITION.CENTER + 120, 'cloud_charaR').setInteractive();
    windL = this.add.image(X_POSITION.CENTER - 350, Y_POSITION.CENTER + 120, 'cloud_charaL').setInteractive();
  
    // Pembuatan tombol untuk memilih jumlah daun yang dikumpulkan
    const btnTextures = ['btn_0', 'btn_1', 'btn_2', 'btn_3', 'btn_4', 'btn_5'];
  
    const btnArray = [];
    for (let i = 0; i < btnTextures.length; i++) {
      const btn = this.add.image(X_POSITION.CENTER - 255 + i * buttonSpacing, Y_POSITION.CENTER, btnTextures[i])
        .setDepth(20)
        .setInteractive()
        .setVisible(false)
        .setScale(0.278);
      btnArray.push(btn);
    }
  
    // Pembuatan panel start dan teksnya
    var panelStart = this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER - 69, 'panel_start')
      .setOrigin(0.5)
      .setDepth(10)
      .setAlpha(0.8)
      .setScale(0.5)
      .setInteractive();
    
    this.lblStart = this.add.text(panelStart.x, panelStart.y - 20, "Start")
      .setOrigin(0.5)
      .setDepth(10)
      .setFontSize(50)
      .setTint(0x000000);
    this.lblStart1 = this.add.text(panelStart.x, panelStart.y + 40, `Level ${this.currentLevel}`)
      .setOrigin(0.5)
      .setDepth(10)
      .setFontSize(30)
      .setTint(0x000000);
  
    // Pembuatan panel keterangan dan teksnya
    var panelKtg = this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER - 250, 'panel_ktg')
      .setOrigin(0.5)
      .setDepth(10)
      .setAlpha(0.8);
    this.lblKtg1 = this.add.text(panelKtg.x, panelKtg.y - 5, "Ketuk awan untuk membantu ulat menangkap dedaunan.")
      .setOrigin(0.5)
      .setDepth(10)
      .setFontSize(30)
      .setTint(0x000000);
    this.lblKtg2 = this.add.text(panelKtg.x, panelKtg.y + 27, "Pilih 'Start' untuk bermain.")
      .setOrigin(0.5)
      .setDepth(10)
      .setFontSize(20)
      .setTint(0x000000);
  
    const yOffset = -75;
  
    // Penambahan physics untuk animasi
    line = this.physics.add.image(X_POSITION.CENTER, Y_POSITION.CENTER + yOffset, 'tali')
      .setScale(0.4)
      .setOrigin(0.5, 0)
      .setInteractive()
      .setDepth(8);
    line.body.setAllowGravity(false);
    line.setImmovable(true);
  
    const cacingOffsetX = 20; // Geser ke kanan sebanyak 20 piksel
  
    // Penambahan Chara cacing
    cacing = this.physics.add.image(line.x, line.y + line.displayHeight, 'worm_chara')
      .setInteractive()
      .setDepth(8);
    cacing.body.setAllowGravity(false);
    cacing.setImmovable(true);
    cacing.setScale(0.2); 
  
    this.cacing = cacing; 
  
    // Penataan daun yang jatuh di kontainer
    const gapFromBottom = 30;
    const startY = Y_POSITION.CENTER + game.canvas.height / 2 - boxHeight / 2 - gapFromBottom;
    const totalColumnWidth = numLeafContainers * (boxWidth + spacing) - spacing;
    const startX = X_POSITION.CENTER - totalColumnWidth / 2 + (boxWidth + spacing) / 2;
  
    for (let i = 0; i < numLeafContainers; i++) {
        const leafContainer = this.add.container(startX + i * (boxWidth + spacing), startY);
        this.leafContainers.push(leafContainer);
  
        const boxImage = this.add.image(0, 0, 'panel_daun')
        .setOrigin(0.5, 0.5)
        .setScale(0.267);
        leafContainer.add(boxImage);
  
        this.add.existing(leafContainer);
    }
    
    // Pembuatan text untuk skor, level, dan total skor
    this.textScore = this.add.text(X_POSITION.CENTER - 400, 20, "Score: 0", {
        font: "25px Arial",
        fill: "#000000",
    });
    this.textLevel = this.add.text(X_POSITION.CENTER + 400, 20, "Level: 1", {
        font: "25px Arial",
        fill: "#000000",
    });
    this.textTotalScore = this.add.text(X_POSITION.CENTER - 200, 20, "Total Score: 0", {
        font: "25px Arial",
        fill: "#000000",
    });
  
    let swingAngle = 100;
    let swingDuration = 700;
    let currentTween = null;
    
    const createSwingTween = (direction) => {
        if (currentTween) {
            currentTween.stop();
        }
        swingAngle *= 0.9; 
        swingDuration *= 0.9;
        currentTween = this.tweens.add({
            targets: [line, cacing],
            angle: direction * swingAngle,
            duration: swingDuration,
            ease: 'Sine.easeInOut',
            paused: true,
            onComplete: () => {
                if (Math.abs(swingAngle) > 5) {
                    createSwingTween(-direction);
                } else {
                    this.tweens.add({
                        targets: [line, cacing],
                        angle: 0,
                        duration: 700,
                        ease: 'Sine.easeInOut',
                    });
                }
            }
        });
        currentTween.play();
    };
    
    // Interaksi ketika tombol awan ditekan
    windR.on('pointerdown', () => {
        console.log("windR clicked");
        snd_cloudClick.play();
        swingAngle = 100;
        swingDuration = 700;
        createSwingTween(1);
    });
    
    windL.on('pointerdown', () => {
        console.log("windL clicked");
        snd_cloudClick.play();
        swingAngle = 100;
        swingDuration = 700;
        createSwingTween(-1);
    });
  
  
    // Pembuatan daun dan penanganannya
    const leafTextures = ['daun1', 'daun2', 'daun3', 'daun4', 'daun5', 'daun6'];
    // Fungsi jatuhnya daun
    const dropdaun = () => {
        if (!gameStarted) {
            return;
        }
    
        let daun;
    
        if (this.leavesSpawned < this.maxLeaves) {
            const randomLeafTexture = Phaser.Math.RND.pick(leafTextures);
    
            const totalContainersWidth = numLeafContainers * (boxWidth + spacing) - spacing;
    
            const xPosition = Phaser.Math.Between(
                X_POSITION.CENTER - totalContainersWidth / 2,
                X_POSITION.CENTER + totalContainersWidth / 2
            );
    
            daun = this.physics.add.image(xPosition, -100, randomLeafTexture).setScale(0.179);
            daun.timeSinceLastCollide = 0;
    
            this.fallenLeaves.push(daun);
    
            this.physics.add.collider(cacing, daun, (cacing, daun) => {
                snd_get.play();
                daun.destroy();
    
                if (daun.lastLeaf) {
                    console.log("Daun terakhir didapat");
                    this.checkpoint();
                }
    
                if (this.points < this.leafContainers.length) {
                    const leafContainer = this.leafContainers[this.points];
    
                    const xPositionInBox = leafContainer.x;
                    const yPositionInBox = leafContainer.y;
    
                    const newdaun = this.physics.add.image(xPositionInBox, yPositionInBox, randomLeafTexture).setScale(0.179);
                    newdaun.body.setAllowGravity(false);
                    newdaun.setImmovable(true);
                    newdaun.setCollideWorldBounds(true);
    
                    this.points++;
                    this.collectedLeavesCount++;
                    this.textScore.setText(`Score: ${this.points}`);
                }
            });
    
            const randomRotation = Phaser.Math.Between(0, 360);
            daun.setAngle(randomRotation);
    
            this.leavesSpawned++;
  
            if (this.leavesSpawned === this.maxLeaves) {
                daun.lastLeaf = true;
                console.log("Daun terakhir muncul");
                this.lastLeaf = daun;
            } else {
                daun.lastLeaf = false;
            }
        }
        
    };
  
    // Penjadwalan jatuhnya daun
    for (let i = 0; i < 5; i++) {
        this.time.delayedCall(Phaser.Math.Between(0, 5000), dropdaun);
    }
    
    // Penanganan klik objek dalam game
    this.input.on('gameobjectdown', function (pointer, gameObject) {
        console.log("Object Click");
  
        if (gameObject == panelStart) {
            snd_start.play();
            btnClicked = true;
            this.startGame();
        }
  
        for (let i = 0; i < btnArray.length; i++) {
            if (gameObject == btnArray[i]) {
                this.checkAnswer(i);
                break;
            }
        }
  
    }, this);
    
    // Fungsi untuk memeriksa jawaban yang dipilih
    this.checkAnswer = function (selectedButtonIndex) {
        if (selectedButtonIndex === this.collectedLeavesCount) {
            snd_benar.play();
            console.log("Jawaban benar");
            this.benar();
            console.log(`Total Score: ${this.totalScore}`);
            
        } else {
            snd_salah.play();
            this.salah();
            console.log("Jawaban salah");
        }
    };
    
    // Fungsi untuk memulai permainan
    this.startGame = function () {
        panelKtg.setVisible(false);
        this.lblKtg1.setVisible(false);
        this.lblKtg2.setVisible(false);
        panelStart.setVisible(false);
        this.lblStart.setVisible(false);
        this.lblStart1.setVisible(false);
  
        gameStarted = true;
  
        for (let i = 0; i < 5; i++) {
            this.time.delayedCall(Phaser.Math.Between(0, 5000), dropdaun);
        }
    };
    
    // Fungsi untuk menangani checkpoint
    this.checkpoint = function () {
        this.lastLeaf = null;
        
        windR.setVisible(false);
        windL.setVisible(false);        
        panelKtg.setVisible(true);
        for (let i = 0; i < btnArray.length; i++) {
            btnArray[i].setVisible(true);
        }        
  
        this.lblKtg1.setVisible(true);
        this.lblKtg2.setVisible(true);
        this.lblKtg1.setText('Berapa daun yang kamu dapat?');
        this.lblKtg2.setText('Pilih Sebuah Angka');
    };
    
    // Fungsi untuk menangani jawaban yang benar
    this.benar = function () {
        this.totalScore += this.collectedLeavesCount;
        
        // save to server
        sendScoreToServer(this.totalScore);


        this.textTotalScore.setText(`Total Score: ${this.totalScore}`);
        
        if (this.currentLevel === 5) {
            this.tamat();
        } else {
            this.currentLevel++;
  
            for (let i = 0; i < btnArray.length; i++) {
                btnArray[i].setVisible(false);
            }
            
            
            panelStart.setVisible(true);
            this.lblStart.setVisible(true);
            this.lblStart1.setVisible(true);
            this.lblKtg1.setVisible(true);
            this.lblKtg2.setVisible(true);
            this.lblKtg1.setText(`Benar, jawabannya adalah ${this.collectedLeavesCount} daun.`);
            this.lblKtg2.setText('Pilih "Start" untuk bermain.');
            this.lblStart1.setText(`Level ${this.currentLevel}`);
            this.textLevel.setText(`Level: ${this.currentLevel}`);
  
            panelStart.once('pointerdown', function () {
                // Interaksi ketika tombol awan ditekan
                windR.on('pointerdown', () => {
                    if (gameStarted) {
                        console.log("windR clicked");
                        snd_cloudClick.play();
                        swingAngle = 100; // reset sudut ayunan
                        swingDuration = 700; // reset durasi ayunan
                        createSwingTween(1); // buat dan mainkan tween baru ke kanan
                    }
                });
                
                windL.on('pointerdown', () => {
                    if (gameStarted) {
                        console.log("windL clicked");
                        snd_cloudClick.play();
                        swingAngle = 100; // reset sudut ayunan
                        swingDuration = 700; // reset durasi ayunan
                        createSwingTween(-1); // buat dan mainkan tween baru ke kiri
                    }
                });
                
                this.handleLevelProgression();
            }, this);
    
            windR.setVisible(true);
            windL.setVisible(true);
        }
    };
    
    // Fungsi untuk menangani progresi level
    this.handleLevelProgression = function () {
        if (this.currentLevel <= 5) {
            this.resetGame();
            this.setupLevel(this.currentLevel);
            this.lblStart1.setText(`Level ${this.currentLevel}`);
        } else {
            console.log("Game completed!");
            this.tamat();
        }
    };
    
    // Fungsi untuk menyiapkan level
    this.setupLevel = function(level) {
        this.lastLeaf = null;
    
        panelKtg.setVisible(true);
        panelStart.setVisible(true);
        this.lblStart.setVisible(true);
        this.lblStart1.setVisible(true);
        this.lblKtg1.setVisible(true);
        this.lblKtg2.setVisible(true);
        windR.setVisible(true);
        windL.setVisible(true);
    
        this.lblKtg1.setText(`Benar, jawabannya adalah ${this.collectedLeavesCount} daun.`);
        this.lblKtg2.setText('Pilih "Start" untuk bermain.');
        this.lblStart1.setText(`Level ${this.currentLevel}`);
        
        switch (level) {
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                return;
        }
    
        gameStarted = true;
    
        for (let i = 0; i < 5; i++) {
            this.time.delayedCall(Phaser.Math.Between(0, 5000), dropdaun);
        }
    };
  
    
    // Fungsi untuk menangani jawaban yang salah
    this.salah = function () {
        panelKtg.setVisible(true);
        for (let i = 0; i < btnArray.length; i++) {
            btnArray[i].setVisible(false);
        }      
        
        panelStart.setVisible(true);
        this.lblStart.setVisible(true);
        this.lblStart1.setVisible(true);
        this.lblKtg1.setVisible(true);
        this.lblKtg2.setVisible(true);
        this.lblKtg1.setText(`Salah, jawabannya adalah ${this.collectedLeavesCount} daun.`);
        this.lblKtg2.setText('Mari Ulang lagi levelnya');
        this.lblStart1.setText(`Level ${this.currentLevel}`);
        windR.setVisible(true);
        windL.setVisible(true);     
  
        panelStart.once('pointerdown', function () {
            // Interaksi ketika tombol awan ditekan
            windR.on('pointerdown', () => {
                if (gameStarted) {
                    console.log("windR clicked");
                    snd_cloudClick.play();
                    swingAngle = 100; // reset sudut ayunan
                    swingDuration = 700; // reset durasi ayunan
                    createSwingTween(1); // buat dan mainkan tween baru ke kanan
                }
            });
            
            windL.on('pointerdown', () => {
                if (gameStarted) {
                    console.log("windL clicked");
                    snd_cloudClick.play();
                    swingAngle = 100; // reset sudut ayunan
                    swingDuration = 700; // reset durasi ayunan
                    createSwingTween(-1); // buat dan mainkan tween baru ke kiri
                }
            });
            
            this.resetGame();
            this.startGame();
        }, this);
    };
    
    // Fungsi untuk mereset permainan
    this.resetGame = function () {
        this.lastLeaf = null;
        this.points = 0;
        this.collectedLeavesCount = 0;
        this.textScore.setText("Score: 0");
        this.leavesSpawned = 0;
        this.maxLeaves = 5;
  
        panelKtg.setVisible(false);
        this.lblKtg2.setVisible(false); 
        panelStart.setVisible(true);
        this.lblStart.setVisible(true);
        this.lblStart1.setVisible(true);
        this.lblKtg1.setVisible(true);
        this.lblKtg2.setVisible(true);
  
        this.leafContainers.forEach((container) => {
            container.destroy();
        });
        this.leafContainers = [];
  
        for (let i = 0; i < numLeafContainers; i++) {
            const leafContainer = this.add.container(startX + i * (boxWidth + spacing), startY);
            this.leafContainers.push(leafContainer);
  
            const boxImage = this.add.image(0, 0, 'panel_daun').setOrigin(0.5, 0.5).setScale(0.267);
            leafContainer.add(boxImage);
  
            this.add.existing(leafContainer);
        }
        for (let i = 0; i < btnArray.length; i++) {
            btnArray[i].setVisible(false);
        }  
        gameStarted = false;
  
        windR.setVisible(true);
        windL.setVisible(true);
    };
    
    // Fungsi untuk merestart permainan
    this.restartGame = function () {
        this.lastLeaf = null;
        this.currentLevel = 1;
        this.totalScore = 0;
  
        this.textScore.setText("Score: 0");
        this.textLevel.setText("Level: 1");
        this.textTotalScore.setText("Total Score: 0");
  
        this.fallenLeaves.forEach((leaf) => {
            leaf.destroy();
        });
        this.fallenLeaves = [];
  
        this.leafContainers.forEach((container) => {
            container.destroy();
        });
        this.leafContainers = [];
  
        for (let i = 0; i < numLeafContainers; i++) {
            const leafContainer = this.add.container(startX + i * (boxWidth + spacing), startY);
            this.leafContainers.push(leafContainer);
  
            const boxImage = this.add.image(0, 0, 'panel_daun').setOrigin(0.5, 0.5).setScale(0.267);
            leafContainer.add(boxImage);
  
            this.add.existing(leafContainer);
        }
  
        this.points = 0;
        this.collectedLeavesCount = 0;
        this.leavesSpawned = 0;
        this.maxLeaves = 5;
  
        panelKtg.setVisible(false);
        this.lblKtg2.setVisible(false);
  
        windR.setVisible(true);
        windL.setVisible(true);
  
        this.startGame();
    };
    
    // Fungsi untuk menangani game tamat
    this.tamat = function () {
        for (let i = 0; i < btnArray.length; i++) {
            btnArray[i].setVisible(false);
        }
  
        panelKtg.setVisible(true);
        panelStart.setVisible(true);
        this.lblStart.setVisible(true);
        this.lblStart1.setVisible(true);
        this.lblKtg1.setVisible(true);
        this.lblKtg2.setVisible(true);
        this.lblKtg1.setText(`Jawabanmu benar semua, total skormu adalah ${this.totalScore}`);
        this.lblKtg2.setText('Pilih "Start" untuk bermain lagi.');
        this.lblStart1.setText(`Level 1`);
        windR.setVisible(true);
        windL.setVisible(true);     
  
        panelStart.once('pointerdown', function () {
            // Interaksi ketika tombol awan ditekan
            windR.on('pointerdown', () => {
                if (gameStarted) {
                    console.log("windR clicked");
                    snd_cloudClick.play();
                    swingAngle = 100; // reset sudut ayunan
                    swingDuration = 700; // reset durasi ayunan
                    createSwingTween(1); // buat dan mainkan tween baru ke kanan
                }
            });
            
            windL.on('pointerdown', () => {
                if (gameStarted) {
                    console.log("windL clicked");
                    snd_cloudClick.play();
                    swingAngle = 100; // reset sudut ayunan
                    swingDuration = 700; // reset durasi ayunan
                    createSwingTween(-1); // buat dan mainkan tween baru ke kiri
                }
            });
    
            this.restartGame();
        }, this);
  
        gameStarted = false;
    };
  }
  
  function update() {
    if (line && this.cacing) {  // Pastikan line dan cacing sudah diinisialisasi
      // Menentukan posisi cacing berdasarkan offset dan jarak dari garis yang sedang berayun
      const xOffset = isSwingingLeft ? -line.displayWidth / 2 : line.displayWidth / 2;
      const yOffset = line.displayHeight / 2;
  
      const angleInRadians = Phaser.Math.DegToRad(line.angle + 90);
      const distanceMultiplier = 2.1;
  
      const xFromLineCenter = Math.cos(angleInRadians) * yOffset * distanceMultiplier;
      const yFromLineCenter = Math.sin(angleInRadians) * yOffset * distanceMultiplier;
  
      this.cacing.x = line.x + xOffset + xFromLineCenter + 10;
      this.cacing.y = line.y + yOffset + yFromLineCenter - 168;
      this.cacing.angle = line.angle; // Menyamakan sudut cacing dengan sudut tali
    }
  
    if (this.lastLeaf && this.lastLeaf.y > game.canvas.height) {
      console.log("Daun terakhir jatuh", this.lastLeaf.y);
      this.checkpoint();    // Jika ya, memanggil fungsi checkpoint
    }
  }
  
  function sendScoreToServer(score) {
    // use javascript fetch
    fetch('http://localhost:8000/api/save-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ score: score }),
    })
  }